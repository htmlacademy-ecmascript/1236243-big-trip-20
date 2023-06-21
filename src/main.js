import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripApiService from './api-service.js';

const AUTHORIZATION = 'Basic 12lkhjaK34KHl';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const tripMain = document.querySelector('.trip-main');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');


const pointsModel = new PointsModel({
  tripApiService: new TripApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  tripContainer: tripEvents,
  pointsModel,
  filterModel,
  tripInfoContainer: tripMain
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripFilters,
  filterModel,
  pointsModel
});

filterPresenter.init();
mainPresenter.init();
pointsModel.init();
