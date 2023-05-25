import TripList from '../view/trip-list.js';
import TripSort from '../view/trip-sort.js';
import { RenderPosition, render } from '../framework/render.js';
import TripEmptyList from '../view/trip-empty-list.js';
import TripPresenter from './trip-presenter.js';
import { updateItem } from '../utils/utils.js';


export default class MainPresenter {
  #tripListComponent = new TripList();
  #tripContainer = null;
  #pointsModel = null;
  #boardTrip = null;
  #destination = null;
  #offers = null;
  #sortComponent = new TripSort();
  #emptyList = new TripEmptyList();
  #tripPresenters = new Map();


  constructor ({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init () {

    this.#boardTrip = [...this.#pointsModel.points];
    this.#destination = [...this.#pointsModel.description];
    this.#offers = [...this.#pointsModel.offers];
    this.#renderBoard();
  }

  #renderBoard () {
    render(this.#tripListComponent, this.#tripContainer);
    if (this.#boardTrip.length === 0) {
      this.#renderNoTrip();
    } else {
      for (let i = 0; i < this.#boardTrip.length; i++) {
        this.#renderTripList(this.#boardTrip[i], this.#offers, this.#destination);
        this.#renderSort();
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
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #clearTripList = () => {
    this.#tripPresenters.forEach((presenter) => presenter.destroy());
    this.#tripPresenters.clear();
  };

  #handleModeChange = () => {
    this.#tripPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleTripChange = (updateTrip) => {
    this.#boardTrip = updateItem(this.#boardTrip, updateTrip);
    this.#tripPresenters.get(updateTrip.id).init(updateTrip, this.#offers, this.#destination);
  };
}
