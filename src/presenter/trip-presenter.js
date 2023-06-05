import TripEditPoint from '../view/trip-edit-point.js';
import TripPoint from '../view/trip-point.js';
import { render, replace, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';

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
      onClick: this.#handleHideEditForm,
      onDeleteClick: this.#handleDeleteClick
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
    this.#tripEditComponent.reset(this.#trip);
    replace(this.#tripComponent, this.#tripEditComponent);
    document.removeEventListener('keydown', this.#escKeyHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceToTrip();
    }
  };

  resetView = () => {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceToTrip();
    }
  };

  #handleDeleteClick = (trip) => {
    this.#handleDataChange(
      UserAction.DELETE_TRIP,
      UpdateType.MINOR,
      trip
    );

  };

  #handleEditClick = () => {
    this.#replaceToEdit();
  };

  #handleFormSubmit = (trip) => {
    this.#replaceToTrip();
    this.#handleDataChange(
      UserAction.UPDATE_TRIP,
      UpdateType.MINOR,
      trip
    );
  };

  #handleHideEditForm = () => {
    this.#replaceToTrip();
  };

  #handleFavoritClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_TRIP,
      UpdateType.PATCH,
      {...this.#trip, isFavorite: !this.#trip.isFavorite}
    );
  };
}
