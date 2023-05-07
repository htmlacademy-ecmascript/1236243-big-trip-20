import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

const diffTime = (dateStart, dateEnd) => {
  const start = dayjs(dateStart);
  const end = dayjs(dateEnd);

  const differentTime = dayjs.duration(end.diff(start));
  const {days, hours, minutes} = differentTime.$d;
  switch (true) {
    case (days > 0):
      return differentTime.format('D[D] H[H] m[M]');
    case (hours > 0):
      return differentTime.format('H[H] m[M]');
    case (minutes < 60):
      return differentTime.format('m[M]');
  }
};

export { getRandomInteger, getRandomArrayElement, humanizeTaskDueDate, diffTime};
