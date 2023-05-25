import dayjs from 'dayjs';

function sortByPrice (pointsA, pointsB) {
  return pointsB.basePrice - pointsA.basePrice;
}

function sortByTime (pointA, pointB) {
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}
export {sortByPrice, sortByTime};
