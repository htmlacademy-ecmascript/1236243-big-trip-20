import AbstractView from '../framework/view/abstract-view.js';

function createTripList () {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripList extends AbstractView {
  get template() {
    return createTripList();
  }
}
