import TripInfo from './view/trip-info.js';
import FiltersTrip from './view/trip-filters.js';
import {render} from './render.js'
import { RenderPosition } from './render.js';
import TripSort from './view/trip-sort.js';
import TripPresenter from './presenter/trip-presenter.js';



const tripMain = document.querySelector('.trip-main')

const tripFilters = tripMain.querySelector('.trip-controls__filters')
const tripEventMain = document.querySelector('.page-main')
const tripEvents = document.querySelector('.trip-events')
const tripListEvent = tripEvents.querySelector('.trip-events__list')
const tripPresenter = new TripPresenter({tripContainer: tripEvents})


render (new TripInfo(), tripMain, RenderPosition.AFTERBEGIN)
render (new FiltersTrip(), tripFilters)

tripPresenter.init()


