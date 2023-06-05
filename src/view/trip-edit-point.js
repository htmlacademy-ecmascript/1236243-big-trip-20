import { findDescription } from '../view/trip-point.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeTaskDueDate } from '../utils/dateUtils.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createAvaibleOffers = (offers, offersID, type) => {
  const offerByType = offers.find((offer) => offer.type === type).offers;
  const arrayOffers = [];

  for (let i = 0; i < offerByType.length; i++) {
    const isChecked = offersID.includes(offerByType[i].id) ? 'checked' : '';
    arrayOffers.push(`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offerByType[i].id}" type="checkbox" name="${offerByType[i].type}" ${isChecked}> 
        <label class="event__offer-label" for="${offerByType[i].id}">
          <span class="event__offer-title">${offerByType[i].title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offerByType[i].price}</span>
        </label>
      </div>`);
  }

  return arrayOffers.join('');
};
const createTypesList = (offers, type) => {
  const typesList = offers.map((offer, index) => `<div class="event__type-${offer.type}">
    <input id="event-type-${offer.type}-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${offer.type === type ? 'checked' : ''} ">
    <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-${index + 1}" data-offer-type="${offer.type}" >${offer.type}</label>
    </div>`).join('');
  return typesList;
};
const createOptionCity = (dest) => {
  const optionCity = dest.map((item) => `<option value='${item.name}'></option>`);
  return optionCity;
};

const createFotoElement = (destination, dest) => {
  const cityFotos = findDescription(destination, dest).pictures;
  const fotoTemplate = cityFotos.map((item) => `<img class="event__photo" src='${item.src}' alt='${item.description}'></img>`);
  return fotoTemplate;
};

function createTripEditPoint (trip, offersAll, dest) {

  const {type, offers: offersId, destination, dateFrom, dateTo, basePrice} = trip;

  const dateFormat = 'DD/MM/YY HH:MM';
  const dateStart = humanizeTaskDueDate(dateFrom, dateFormat);
  const dateEnd = humanizeTaskDueDate(dateTo, dateFormat);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${createTypesList(offersAll, type)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${findDescription(destination,dest).name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createOptionCity(dest)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createAvaibleOffers(offersAll, offersId, type)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${findDescription(destination,dest).description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createFotoElement(destination, dest)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
}

export default class TripEditPoint extends AbstractStatefulView {

  #offer = null;
  #destination = null;
  #handleSubmit = null;
  #handleClick = null;
  #datapickerStart = null;
  #datapickerEnd = null;
  #handleDelete = null;

  constructor ({trip, offers, destination, onSubmit, onClick, onDeleteClick}) {
    super();
    this._setState(this.#parseTripToState({trip}));
    this.#offer = offers;
    this.#destination = destination;
    this.#handleSubmit = onSubmit;
    this.#handleClick = onClick;
    this.#handleDelete = onDeleteClick;
    this._restoreHandlers();

  }

  get template() {
    return createTripEditPoint(this._state, this.#offer, this.#destination);
  }

  removeElement() {
    super.removeElement();

    if(this.#datapickerStart) {
      this.#datapickerStart.destroy();
      this.#datapickerStart = null;
    }
    if(this.#datapickerEnd) {
      this.#datapickerEnd.destroy();
      this.#datapickerEnd = null;
    }
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(this.#parseStateToTrip(this._state));
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #inputHandlerDestination = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#destination.find((tripDest) => tripDest.name === evt.target.value);
    if (selectedDestination === undefined) {
      this.updateElement({
        destination: this._state.destination
      });
      return;
    }
    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #clickHandlerType = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #clickHandlerOffer = (evt) => {
    evt.preventDefault();
    const checkedBoxed = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: checkedBoxed.map((el) => el.id)
    });
  };

  #clickHandlerDelete = (evt) => {
    evt.preventDefault();
    this.#handleDelete(this.#parseStateToTrip(this._state));
  };

  #changeHandlerPrice = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
    });
  };

  #setDatepicker = () => {
    const [dateFrom, dateTo] = this.element.querySelectorAll('.event__input--time');
    this.#datapickerStart = flatpickr(
      dateFrom,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
        maxDate: this._state.dateTo,
        'time_24hr': true,
        locale: {
          firstDayOfWeek:1
        }
      }
    );
    this.#datapickerEnd = flatpickr(
      dateTo,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.dateFrom,
        'time_24hr': true,
        locale: {
          firstDayOfWeek:1
        }
      }
    );
  };


  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement ({
      dateFrom: dayjs(userDate).toJSON()
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement ({
      dateTo: dayjs(userDate).toJSON()
    });
  };

  #parseTripToState = ({trip}) => ({...trip});

  #parseStateToTrip = (state) => {
    const trip = {...state};
    return trip;
  };

  reset = (trip) => {
    this.updateElement(this.#parseTripToState({trip}));

  };

  _restoreHandlers () {
    this.element.querySelector('.event').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#clickHandlerType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#inputHandlerDestination);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#clickHandlerOffer);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#changeHandlerPrice);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#clickHandlerDelete);
    this.#setDatepicker();
  }
}
