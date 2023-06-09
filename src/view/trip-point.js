import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTaskDueDate, diffTime } from '../utils/dateUtils.js';


const findDescription = (destination, dest) => {
  if(destination === null) {
    return '';
  }

  const city = dest.find((el) => destination === el.id);
  return city;
};

const createAvaibleOffers = (offers, offersID, type) => {
  const offerByType = offers.find((offer) => offer.type === type).offers;
  const offersFilter = offerByType.filter((item) => offersID.includes(item.id));

  const arrayOffers = [];
  for (let i = 0; i < offersFilter.length; i++) {
    arrayOffers.push(`<li class="event__offer">
        <span class="event__offer-title">${offersFilter[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offersFilter[i].price}</span>
      </li>`);
  }

  return arrayOffers.join('');
};

const isFavoriteTrip = (isFavorite) => isFavorite === true ? '--active' : '';

function createTripPoint (trip, offers, dest) {

  const {basePrice, type, offers: offersID, destination, isFavorite, dateFrom, dateTo} = trip;
  const dateFormatTime = 'HH:mm';
  const dateFormatDay = 'MMM DD';
  const dateStart = humanizeTaskDueDate(dateFrom, dateFormatTime);
  const dateEnd = humanizeTaskDueDate(dateTo, dateFormatTime);
  const dateDayStart = humanizeTaskDueDate(dateFrom, dateFormatDay);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${dateDayStart}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${findDescription(destination, dest).name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${dateStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${dateEnd}</time>
        </p>
        <p class="event__duration">${diffTime(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createAvaibleOffers(offers, offersID, type)}
      </ul>
      <button class="event__favorite-btn event__favorite-btn${isFavoriteTrip(isFavorite)}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
}

export default class TripPoint extends AbstractView {
  #trip = null;
  #offers = null;
  #destination = null;
  #handleClick = null;
  #handleFavoritClick = null;

  constructor ({trip, offers, destination, onClick, onFavoriteClick}) {
    super();
    this.#trip = trip;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleClick = onClick;
    this.#handleFavoritClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoritClickHandler);
  }

  get template () {
    return createTripPoint(this.#trip, this.#offers, this.#destination);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  #favoritClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoritClick();
  };
}

export {findDescription};
