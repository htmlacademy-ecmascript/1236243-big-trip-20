import { CITY_DESCRIPTION } from '../mock/descriptions.js';
import { OFFERS } from '../mock/offers.js';
import { getRandomPoint } from '../mock/trip.js';

const TRIP = 3;

export default class PointsModel {
  points = Array.from({length: TRIP}, getRandomPoint);
  offersAll = OFFERS;
  descriptionsCity = CITY_DESCRIPTION;

  getPoints () {
    return this.points;
  }

  getDescription() {
    return this.descriptionsCity;
  }

  getOffers() {
    return this.offersAll;
  }
}
