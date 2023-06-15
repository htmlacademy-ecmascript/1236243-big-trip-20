import TripList from '../view/trip-list.js';
import TripSort from '../view/trip-sort.js';
import { RenderPosition, remove, render } from '../framework/render.js';
import TripEmptyList from '../view/trip-empty-list.js';
import TripPresenter from './trip-presenter.js';
import { sortByPrice, sortByTime } from '../utils/sort.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter.js';
import TripInfo from '../view/trip-info.js';
import NewButton from '../view/trip-new-button.js';
import NewTripPresenter from './new-trip-presenter.js';

export default class MainPresenter {
  #tripListComponent = new TripList();
  #tripContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #destination = null;
  #offers = null;
  #sortComponent = null;
  #emptyListComponent = null;
  #tripPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #tripInfoContainer = null;
  #tripInfo = null;
  #newButton = null;
  #newTripPresenter = null;

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
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  init () {
    this.#destination = [...this.#pointsModel.description];
    this.#offers = [...this.#pointsModel.offers];
    this.#renderTripInfo();
    this.#renderBoard();
    this.#renderSort();
    this.#renderNewButton();
  }

  #renderBoard () {
    render(this.#tripListComponent, this.#tripContainer);

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
      this.#renderTripList(points[i], this.#offers, this.#destination);
    }
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
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNewButton () {
    this.#newButton = new NewButton({
      onClick: this.#handleNewTripButton
    });
    render (this.#newButton, this.#tripInfoContainer, RenderPosition.BEFOREEND);
  }

  #handleNewTripButton = () => {
    this.#createNewTrip();
    this.#newButton.element.disabled = true;
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
    remove(this.#emptyListComponent);
    if(resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    //вызываем обновление модели
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this.#pointsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this.#pointsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this.#pointsModel.deleteTrip(updateType, update);
    }

  };

  #handleModelEvent = (updateType, data) => {
    // в зависимости от типа изменений решаем, что делать
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripPresenters.get(data.id).init(data, this.#offers, this.#destination);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
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
    this.#newTripPresenter.init(null, this.#offers, this.#destination);

  };
}
