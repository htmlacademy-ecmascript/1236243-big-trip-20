import TripInfo from './view/trip-info.js';
import FiltersTrip from './view/trip-filters.js';
import { render } from './framework/render.js';
import { RenderPosition } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/model.js';
import { generateFilter } from './mock/filter.js';


const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);
const tripPresenter = new TripPresenter({
  tripContainer: tripEvents,
  pointsModel
});


render (new TripInfo(), tripMain, RenderPosition.AFTERBEGIN);
render (new FiltersTrip({filters}), tripFilters);

tripPresenter.init();
