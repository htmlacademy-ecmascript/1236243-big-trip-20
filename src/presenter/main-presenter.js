import TripList from '../view/trip-list.js';
import TripSort from '../view/trip-sort.js';
import { RenderPosition, remove, render } from '../framework/render.js';
import TripEmptyList from '../view/trip-empty-list.js';
import TripPresenter from './trip-presenter.js';
import { sortByPrice, sortByTime, sortDay } from '../utils/sort.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter.js';
import TripInfo from '../view/trip-info.js';
import NewButton from '../view/trip-new-button.js';
import NewTripPresenter from './new-trip-presenter.js';
import TripLoading from '../view/trip-loading.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class MainPresenter {
  #tripListComponent = new TripList();
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #emptyListComponent = null;
  #tripPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #tripInfoContainer = null;
  #tripInfo = null;
  #newButton = null;
  #newTripPresenter = null;
  #pointsLoading = new TripLoading();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor ({tripContainer, pointsModel, filterModel, tripInfoContainer}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#tripInfoContainer = tripInfoContainer;

    this.#newTripPresenter = new NewTripPresenter({
      tripListComponent: this.#tripListComponent.element,
      onSubmit: this.#handleViewAction,
      onDeleteClick: this.#handleDeleteClick
    });


    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = [...this.#pointsModel.points];
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  get destination() {
    return this.#pointsModel.description;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init () {
    this.#renderTripInfo();
    this.#renderNewButton();
    this.#renderBoard();

  }

  #renderBoard () {
    render(this.#tripListComponent, this.#tripContainer);

    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      remove(this.#sortComponent);
      this.#renderNoTrip();
      return;
    }
    this.#newTripPresenter = new NewTripPresenter({
      tripListComponent: this.#tripListComponent.element,
      onSubmit: this.#handleViewAction,
      onDeleteClick: this.#handleDeleteClick
    });


    for (let i = 0; i < pointsCount; i++) {
      this.#renderTripList(points[i], this.offers, this.destination);
    }
    this.#renderSort();
  }

  #renderTripInfo () {
    this.#tripInfo = new TripInfo();
    render (this.#tripInfo, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoTrip () {
    this.#emptyListComponent = new TripEmptyList({
      filterType: this.#filterType
    });
    return render(this.#emptyListComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripList (trip, offers, destination) {
    const tripPresenter = new TripPresenter({
      tripListComponent: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    tripPresenter.init(trip, offers, destination);
    this.#tripPresenters.set(trip.id, tripPresenter);
  }

  #renderSort () {
    this.#sortComponent = new TripSort({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSort: this.#currentSortType
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNewButton () {
    this.#newButton = new NewButton({
      onClick: this.#handleNewTripButton
    });
    render (this.#newButton, this.#tripInfoContainer, RenderPosition.BEFOREEND);
  }

  #renderLoading () {
    return render(this.#pointsLoading, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #handleNewTripButton = () => {
    this.#createNewTrip();
    this.#newButton.element.disabled = true;
    remove(this.#emptyListComponent);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    remove(this.#pointsLoading);
    if(resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#tripPresenters.get(update.id).setSaving();
        try{
          await this.#pointsModel.updateTrip(updateType, update);
        } catch(err) {
          this.#tripPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_TRIP:
        this.#newTripPresenter.setSaving();
        try {
          await this.#pointsModel.addTrip(updateType, update);
        } catch(err) {
          this.#newTripPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_TRIP:
        this.#tripPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deleteTrip(updateType, update);
        } catch(err){
          this.#tripPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
    this.#newButton.element.disabled = false;
  };

  #handleModelEvent = (updateType, data) => {
    // в зависимости от типа изменений решаем, что делать
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenters.get(data.id).init(data, this.offers, this.destination);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#pointsLoading);
        this.#renderBoard();
        break;
    }
  };

  #handleDeleteClick = () => {
    this.#newButton.element.disabled = false;
  };

  #createNewTrip = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newTripPresenter.init(null, this.offers, this.destination);
  };
}
