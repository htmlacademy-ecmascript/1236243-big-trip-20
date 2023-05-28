import TripEditPoint from '../view/trip-edit-point.js';
import TripPoint from '../view/trip-point.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITTING: 'EDITTING'
};

export default class TripPresenter {
  #tripListComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #tripComponent = null;
  #tripEditComponent = null;

  #trip = null;
  #offers = null;
  #destination = null;
  #mode = Mode.DEFAULT;

  constructor ({tripListComponent, onDataChange, onModeChange}) {
    this.#tripListComponent = tripListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(trip, offers, destination) {
    this.#trip = trip;
    this.#offers = offers;
    this.#destination = destination;

    const prevTripComponent = this.#tripComponent;
    const prevEditTripComponent = this.#tripEditComponent;

    this.#tripComponent = new TripPoint({
      trip: this.#trip,
      offers: this.#offers,
      destination: this.#destination,
      onClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoritClick
    });

    this.#tripEditComponent = new TripEditPoint({
      trip: this.#trip,
      offers: this.#offers,
      destination: this.#destination,
      onSubmit: this.#handleFormSubmit,
      onClick: this.#handleFormSubmit,
      onFavoriteClick: this.#handleFavoritClick
    });

    if (prevTripComponent === null || prevEditTripComponent === null) {
      render(this.#tripComponent, this.#tripListComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripComponent, prevTripComponent);
    }

    if (this.#mode === Mode.EDITTING) {
      replace(this.#tripEditComponent, prevEditTripComponent);
    }


    remove(prevTripComponent);
    remove(prevEditTripComponent);
  }

  destroy() {
    remove(this.#tripComponent);
    remove(this.#tripEditComponent);
  }

  #replaceToEdit() {
    replace(this.#tripEditComponent, this.#tripComponent);
    document.addEventListener('keydown', this.#escKeyHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITTING;
  }

  #replaceToTrip() {
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#escKeyHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#tripEditComponent.reset(this.#trip);
      this.#replaceToTrip();
    }
  };

  resetView = () => {
    if(this.#mode !== Mode.DEFAULT) {
      this.#tripEditComponent.reset(this.#trip);
      this.#replaceToTrip();
    }
  };

  #handleEditClick = () => {
    this.#replaceToEdit();
  };

  #handleFormSubmit = () => {
    this.#replaceToTrip();
  };

  #handleFavoritClick = () => {
    this.#handleDataChange({...this.#trip, isFavorite: !this.#trip.isFavorite});
  };
}
