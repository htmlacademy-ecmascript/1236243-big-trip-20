import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewButton from './view/trip-new-button.js';
import { RenderPosition, render } from './framework/render.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  tripContainer: tripEvents,
  pointsModel,
  filterModel,
  tripInfoContainer: tripMain,
  onNewTripDestroy: handleNewTripClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFilters,
  filterModel,
  pointsModel
});

const newTripButtonComponent = new NewButton({
  onClick: handleNewTripButton
})

function handleNewTripButton() {
  mainPresenter.createNewTrip()
  newTripButtonComponent.element.disabled = true
}

function handleNewTripClose () {
  newTripButtonComponent.element.disabled = false
}

render (newTripButtonComponent, tripMain, RenderPosition.BEFOREEND)

filterPresenter.init();
mainPresenter.init();
