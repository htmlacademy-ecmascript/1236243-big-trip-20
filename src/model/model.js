import { getRandomPoint } from '../mock/trip.js';

const TRIP = 3;

export default class PointsModel {
  points = Array.from({length: TRIP}, getRandomPoint);

  getPoints () {
    return this.points;
  }
}
