import { RenderPosition, render } from '../render.js';
import TripView from '../view/trip-view.js';
import TripList from '../view/trip-list.js'
import TripSort from '../view/trip-sort.js';
import TripEditPoint from '../view/trip-edit-point.js';
import TripPoint from '../view/trip-point.js';

 const TRIP = 3

export default class TripPresenter {
    tripListComponent = new TripList()


    constructor ({tripContainer}) {
        this.tripContainer = tripContainer
    }

    init () {
        render(new TripSort(), this.tripContainer)
        render(this.tripListComponent, this.tripContainer)
        render(new TripEditPoint(), this.tripListComponent.getElement())

        for (let i = 0; i < TRIP; i++) {
            render(new TripPoint(), this.tripListComponent.getElement())
        }
        
        
    }
}