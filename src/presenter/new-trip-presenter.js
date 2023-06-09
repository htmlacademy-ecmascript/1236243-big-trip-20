import { nanoid } from "nanoid"
import { UpdateType, UserAction } from "../const"
import { remove, render } from "../framework/render"
import AddPoint from "../view/trip-add-point"
import TripEditPoint from "../view/trip-edit-point"



export default class NewTripPresenter {
    #triplistComponent = null
    #handleDataChange = null
    #handleDestroy = null
    #trip = null
    #offers = null
    #destination = null

    #newTripComponent = null

    constructor(tripListComponent, onDataChange, onDestroy) {
        this.#triplistComponent = tripListComponent,
        this.#handleDataChange = onDataChange,
        this.#handleDestroy = onDestroy
    }

    init(trip, offers, destination) {
        this.#trip = trip
        this.#offers = offers
        this.#destination = destination

        if(this.#newTripComponent !== null) {
            return
        }

        this.#newTripComponent = new TripEditPoint({
            trip: this.#trip,
            offers: this.#offers,
            destination: this.#destination
        })
        render(this.#newTripComponent, this.#triplistComponent)
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