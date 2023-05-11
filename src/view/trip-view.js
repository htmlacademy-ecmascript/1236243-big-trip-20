import AbstractView from '../framework/view/abstract-view.js';

function createTripTemplate() {
  return '<section class="container"></section>';
}

export default class TripView extends AbstractView {
  get template() {
    return createTripTemplate();
  }
}
