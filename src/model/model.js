import { CITY_DESCRIPTION } from '../mock/descriptions.js';
import { OFFERS } from '../mock/offers.js';
import { getRandomPoint } from '../mock/trip.js';
import Observable from '../framework/observable.js';

const TRIP = 4;

export default class PointsModel extends Observable{
  #points = Array.from({length: TRIP}, getRandomPoint);
  #offersAll = OFFERS;
  #descriptionsCity = CITY_DESCRIPTION;

  get points () {
    return this.#points;
  }

  get description() {
    return this.#descriptionsCity;
  }

  get offers() {
    return this.#offersAll;
  }

  updateTrip (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexistind trip');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addTrip (updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  deleteTrip (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexistind trip');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
