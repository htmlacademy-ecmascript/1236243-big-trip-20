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
    return this.#descriptionsCity;
  }

  get offers() {
    return this.#offersAll ;
  }

  async init() {
    try {
      const points = await this.#tripApiService.trips;
      this.#points = points.map(this.#adaptToClient);
      this.#descriptionsCity = await this.#tripApiService.getDestinations();
      this.#offersAll = await this.#tripApiService.getOffers();
    } catch(err) {
      this._notify(UpdateType.ERROR);
      this.#points = [];
      return;
    }
    this._notify(UpdateType.INIT);
  }

  async updateTrip (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if(index === -1) {
      throw new Error('Can\'t update unexistind trip');
    }

    try {
      const responce = await this.#tripApiService.updateTrip(update);
      const updatedTrip = this.#adaptToClient(responce);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedTrip,
        ...this.#points.slice(index + 1)
      ];
    } catch(err) {
      throw new Error('Can\'t update route point');
    }
    this._notify(updateType, update);
  }

  async addTrip (updateType, update) {
    try {
      const responce = await this.#tripApiService.addTrip(update);
      const newTrip = this.#adaptToClient(responce);
      this.#points = [newTrip, ...this.#points];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deleteTrip (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if(index === -1) {
      throw new Error('Can\'t update unexistind trip');
    }
    try {
      await this.#tripApiService.deleteTrip(update);
      this.#points.splice(index, 1);
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete task');
    }

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
