import { nanoid } from "nanoid"
import { UpdateType, UserAction } from "../const"
import { RenderPosition, remove, render } from "../framework/render"
import AddPoint from "../view/trip-add-point"
import TripEditPoint from "../view/trip-edit-point"



export default class NewTripPresenter {
    #triplistComponent = null
    #handleDataChange = null
    #handleDestroy = null
    #destination = null

    #newTripComponent = null

    constructor(tripListComp, onSubmit, onDeleteClick) {
        this.#triplistComponent = tripListComp,
        this.#handleDataChange = onSubmit,
        this.#handleDestroy = onDeleteClick
    }

    init(trip, offers, destination) {
        if(this.#newTripComponent !== null) {
            return
        }
        this.#newTripComponent = new TripEditPoint({
            trip,
            offers,
            destination, 
            onSubmit: this.#handleFormSubmit,
            onDeleteClick: this.#handleDeleteClick

        })
        render(this.#newTripComponent, this.#triplistComponent, RenderPosition.AFTERBEGIN)
        document.addEventListener('keydown', this.#escKeyDownHandler)
    }

    destroy () {
        if (this.#newTripComponent === null) {
            return
        }

        this.#handleDestroy()
        remove(this.#newTripComponent)
        this.#newTripComponent = null

        document.removeEventListener('keydown', this.#escKeyDownHandler)
    }

    #handleFormSubmit = (trip) => {
        this.#handleDataChange(
            UserAction.ADD_TRIP,
            UpdateType.MINOR,
            {id: nanoid(), ...trip}
        )
        this.destroy()
    }

    #handleDeleteClick = () => {
        this.destroy()
    }
    #escKeyDownHandler = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          this.destroy();
        }
      };
}