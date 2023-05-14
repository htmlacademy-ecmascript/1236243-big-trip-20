import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(duration);
dayjs.extend(isBetween);


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
      return differentTime.format('DD[D] HH[H] mm[M]');
    case (hours > 0):
      return differentTime.format('HH[H] mm[M]');
    case (minutes < 60):
      return differentTime.format('mm[M]');
  }
};


const isPast = (dateEnd) => dayjs().isAfter(dayjs(dateEnd));

const isFuture = (dateStart) => dayjs().isBefore(dayjs(dateStart));

const isPresent = (dateStart, dateEnd) => dayjs().isBetween(dateStart, dateEnd, 'day', '[]');


export { humanizeTaskDueDate, diffTime, isPast, isFuture, isPresent};
