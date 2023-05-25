import TripList from '../view/trip-list.js';
import TripSort from '../view/trip-sort.js';
import { RenderPosition, render } from '../framework/render.js';
import TripEmptyList from '../view/trip-empty-list.js';
import TripPresenter from './trip-presenter.js';
import { updateItem } from '../utils/utils.js';
import { sortByPrice, sortByTime } from '../utils/sort.js';
import { SortType } from '../const.js';


export default class MainPresenter {
  #tripListComponent = new TripList();
  #tripContainer = null;
  #pointsModel = null;

  #boardTrip = null;
  #destination = null;
  #offers = null;
  #sortComponent = null;
  #emptyList = new TripEmptyList();
  #tripPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sourcedTrip = [];


  constructor ({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init () {

    this.#boardTrip = [...this.#pointsModel.points];
    this.#destination = [...this.#pointsModel.description];
    this.#offers = [...this.#pointsModel.offers];

    this.#sourcedTrip = [...this.#pointsModel.points];

    this.#renderBoard();
    this.#renderSort();
  }

  #renderBoard () {
    render(this.#tripListComponent, this.#tripContainer);
    if (this.#boardTrip.length === 0) {
      this.#renderNoTrip();
    } else {
      for (let i = 0; i < this.#boardTrip.length; i++) {
        this.#renderTripList(this.#boardTrip[i], this.#offers, this.#destination);
      }
    }
  }

  #renderNoTrip () {
    if(this.#boardTrip.length === 0) {
      return render(this.#emptyList, this.#tripContainer, RenderPosition.AFTERBEGIN);

    }
  }

  #renderTripList (trip, offers, destination) {
    const tripPresenter = new TripPresenter({
      tripListComponent: this.#tripListComponent.element,
      onDataChange: this.#handleTripChange,
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortTrips(sortType);

    this.#clearTripList();

    this.#renderBoard();
  };

  #sortTrips = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#boardTrip.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#boardTrip.sort(sortByPrice);
        break;
      default:
        this.#boardTrip = [...this.#sourcedTrip];
    }
    this.#currentSortType = sortType;
  };

  #clearTripList = () => {
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
  };

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleTripChange = (updateTrip) => {
    this.#boardTrip = updateItem(this.#boardTrip, updateTrip);
    this.#sourcedTrip = updateItem(this.#boardTrip, updateTrip);
    this.#tripPresenters.get(updateTrip.id).init(updateTrip, this.#offers, this.#destination);
  };
}
