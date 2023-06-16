import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable{
  #tripApiService = null;
  #points = [];
  #offersAll = null;
  #descriptionsCity = null;

  constructor({tripApiService}) {
    super();
    this.#tripApiService = tripApiService;
  }

  get points () {
    return this.#points;
  }

  get description() {
    this.#descriptionsCity = this.#tripApiService.getDescription();
    console.log(this.#descriptionsCity);
    return this.#descriptionsCity;
  }

  get offers() {
    this.#offersAll = this.#tripApiService.getOffers();
    return this.#offersAll ;
  }

  async init() {
    try {
      const points = await this.#tripApiService.trips;
      this.#points = points.map(this.#adaptToClient);
      console.log(this.#points);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
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

  #adaptToClient(trip) {
    const adaptedTrip = {...trip,
      basePrice: trip['base_price'],
      dateFrom: trip['date_from'],
      dateTo: trip['date_to'],
      isFavorite: trip['is_favorite']
    };

    delete adaptedTrip['base_price'];
    delete adaptedTrip['date_from'];
    delete adaptedTrip['date_to'];
    delete adaptedTrip['is_favorite'];
    return adaptedTrip;
  }
}
