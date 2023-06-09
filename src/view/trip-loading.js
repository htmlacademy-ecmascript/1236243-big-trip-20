import AbstractView from '../framework/view/abstract-view';

function createTemplateLoading () {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class TripLoading extends AbstractView {
  get template () {
    return createTemplateLoading;
  }
}
