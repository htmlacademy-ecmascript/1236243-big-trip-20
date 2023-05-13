import { FilterType } from '../const';
import { isPast, isFuture, isPresent } from '../utils/dateUtils.js';


const filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.PAST]: (trips) => trips.filter((trip) => isPast(trip.dateTo)),
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => isFuture(trip.dateFrom)),
  [FilterType.PRESENT]: (trips) => trips.filter((trip) => isPresent(trip.dateTo, trip.dateFrom)),
};

export { filter };
