import ApiService from './framework/api-service.js';
import dayjs from 'dayjs';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class TripApiService extends ApiService {
  get trips() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async getOffers () {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async getDestinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  async updateTrip(trip) {
    const response = await this._load({
      url: `points/${trip.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async addTrip(trip) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(trip)),
      headers: new Headers({'Content-Type': 'Application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  async deleteTrip (trip) {
    return await this._load({
      url: `points/${trip.id}`,
      method: Method.DELETE
    });
  }

  #adaptToServer (trip) {
    const adaptedTrip = {...trip,
      'base_price': Number(trip.basePrice),
      'date_from': dayjs(trip.dateFrom).toJSON(),
      'date_to': dayjs(trip.dateTo).toJSON(),
      'is_favorite': trip.isFavorite ?? false
    };

    delete adaptedTrip.price;
    delete adaptedTrip.basePrice;
    delete adaptedTrip.dateFrom;
    delete adaptedTrip.dateTo;
    delete adaptedTrip.isFavorite;

    return adaptedTrip;
  }
}
