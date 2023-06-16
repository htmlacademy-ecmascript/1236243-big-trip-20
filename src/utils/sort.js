import dayjs from 'dayjs';

function sortByPrice (pointsA, pointsB) {
  return pointsB.basePrice - pointsA.basePrice;
}

function sortByTime (pointA, pointB) {
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}

function sortDay (firstPoint, secondPoint) {
  const firstPointDate = dayjs(firstPoint.dateFrom);
  const secondPointDate = dayjs(secondPoint.dateFrom);
  return firstPointDate.valueOf() - secondPointDate.valueOf();
}
export {sortByPrice, sortByTime, sortDay};
