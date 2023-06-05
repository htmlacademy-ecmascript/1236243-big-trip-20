import TripInfo from './view/trip-info.js';
import { render } from './framework/render.js';
import { RenderPosition } from './framework/render.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';


const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  tripContainer: tripEvents,
  pointsModel,
  filterModel
});
const filterPresenter = new FilterPresenter({
  filterContainer: tripFilters,
  filterModel,
  pointsModel
});

render (new TripInfo(), tripMain, RenderPosition.AFTERBEGIN);

filterPresenter.init();
mainPresenter.init();
