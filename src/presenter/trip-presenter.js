import TripList from '../view/trip-list.js';
import TripSort from '../view/trip-sort.js';
import TripEditPoint from '../view/trip-edit-point.js';
import TripPoint from '../view/trip-point.js';
import { render, replace } from '../framework/render.js';


export default class TripPresenter {
  #tripListComponent = new TripList();
  #tripContainer = null;
  #pointsModel = null;
  #boardTrip = null;
  #destination = null;
  #offers = null;


  constructor ({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;

  }

  init () {
    this.#boardTrip = [...this.#pointsModel.points];
    this.#destination = [...this.#pointsModel.description];
    this.#offers = [...this.#pointsModel.offers];


    render(new TripSort(), this.#tripContainer);
    render(this.#tripListComponent, this.#tripContainer);

    for (let i = 0; i < this.#boardTrip.length; i++) {
      this.#renderTrip(this.#boardTrip[i], this.#offers, this.#destination);
    }
  }

  #renderTrip (trip, offers, destination) {

    const escKeyHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceToTrip();
        document.removeEventListener('keydown', escKeyHandler);
      }
    };

    const tripComponent = new TripPoint({trip, offers, destination, onClick: ()=>{
      replaceToEdit();
      document.addEventListener('keydown', escKeyHandler);
    }});

    const editComponent = new TripEditPoint({trip, offers, destination, onSubmit: () => {
      escKeyHandler();
      document.removeEventListener('keydown', escKeyHandler);
    }});

    function replaceToEdit () {
      replace(editComponent, tripComponent);
    }
    function replaceToTrip () {
      replace(tripComponent, editComponent);
    }
    render(tripComponent, this.#tripListComponent.element);
  }


  #handleSubmitClick = () => {

  };
}
