import { CITY_DESCRIPTION } from '../mock/descriptions.js';
import { OFFERS } from '../mock/offers.js';
import { getRandomPoint } from '../mock/trip.js';

const TRIP = 5;

export default class PointsModel {
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
}
