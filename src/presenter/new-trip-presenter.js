import { UpdateType, UserAction } from '../const';
import { RenderPosition, remove, render } from '../framework/render';
import TripEditPoint from '../view/trip-edit-point';


export default class NewTripPresenter {
  #tripListComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #newTripComponent = null;

  constructor({tripListComponent, onSubmit, onDeleteClick}) {
    this.#tripListComponent = tripListComponent;
    this.#handleDataChange = onSubmit;
    this.#handleDestroy = onDeleteClick;
  }

  init(trip, offers, destination) {
    if(this.#newTripComponent !== null) {
      return;
    }
    this.#newTripComponent = new TripEditPoint({
      trip,
      offers,
      destination,
      onSubmit: this.#handleFormSubmit,
      onCanselClick: this.#handleCanselClick
    });
    render(this.#newTripComponent, this.#tripListComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy () {
    if (this.#newTripComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#newTripComponent);
    this.#newTripComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving () {
    this.#newTripComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newTripComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newTripComponent.shake(resetFormState);
  }

  #handleFormSubmit = (trip) => {
    this.#handleDataChange(
      UserAction.ADD_TRIP,
      UpdateType.MINOR,
      trip,
    );
    this.destroy();
  };

  #handleCanselClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
