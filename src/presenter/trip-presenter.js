import TripList from '../view/trip-list.js';
import TripSort from '../view/trip-sort.js';
import TripEditPoint from '../view/trip-edit-point.js';
import TripPoint from '../view/trip-point.js';
import { render } from '../render.js';


export default class TripPresenter {
  tripListComponent = new TripList();


  constructor ({tripContainer, pointsModel}) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;

  }

  init () {
    this.boardTrip = [...this.pointsModel.getPoints()];

    render(new TripSort(), this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new TripEditPoint(), this.tripListComponent.getElement());

    for (let i = 0; i < this.boardTrip.length; i++) {
      render(new TripPoint({trip: this.boardTrip[i]}), this.tripListComponent.getElement());
    }


  }
}
