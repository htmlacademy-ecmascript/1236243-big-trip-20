import AbstractView from '../framework/view/abstract-view';

function createTripError () {
  return '<p class="trip-events__msg">Server is unavailable</p>';
}

export default class TripError extends AbstractView{
  get template () {
    return createTripError();
  }
}
