import { CITY_DESCRIPTION } from "../mock/descriptions";
import { createElement } from "../render";


const findDescription = (destination) => {
  const city = CITY_DESCRIPTION.find((el) => destination === el.id)
  
  return city.name
}
  

const createAvaibleOffers = (offer) => {
  const offerByType = offer.offers
  const arrayOffers = []
  console.log(offerByType)

  for (let i = 0; i < offerByType.length; i++) {
    arrayOffers.push(`<li class="event__offer">
    <span class="event__offer-title">${offerByType[i].title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offerByType[i].price}</span>
  </li>`)
  }

  return arrayOffers.join('')
}

const isFavoriteTrip = (isFavorite) => {
  return isFavorite === true ? '--active' : ''
}

function createTripPoint (trip) {

    const {basePrice, type, offers, destination, isFavorite} = trip
    console.log(isFavorite);

    return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">MAR 18</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${findDescription(destination)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
        </p>
        <p class="event__duration">30M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${createAvaibleOffers(offers)}
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
  </li>`
}

export default class TripPoint {

    constructor ({trip}) {
      this.trip = trip
    }


    getTemplate () {
        return createTripPoint(this.trip)
    }

    getElement() {
        if(!this.element) {
            this.element = createElement(this.getTemplate())
        }

        return this.element
    }

    removeElement() {
        this.element = null
    }
}