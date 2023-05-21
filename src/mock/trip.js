import { nanoid } from 'nanoid';
import { getRandomArrayElement, getRandomInteger} from '../utils/utils.js';


const points = [
  {
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2022-07-10T19:55:56.845Z',
    dateTo: '2022-07-11T23:22:13.375Z',
    destination: 1,
    isFavorite: false,
    type: 'check-in',
    offers: [1, 2]

  },
  {
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2022-10-10T18:55:56.845Z',
    dateTo: '2022-10-11T19:22:13.375Z',
    destination: 2,
    isFavorite: true,
    type: 'drive',
    offers: [1, 2]

  },
  {
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2023-05-01T17:55:56.845Z',
    dateTo: '2023-06-24T15:22:13.375Z',
    destination: 3,
    isFavorite: false,
    type: 'restaurant',
    offers: [1, 2, 4]

  },
  {
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2023-07-10T20:55:56.845Z',
    dateTo: '2023-07-11T09:22:13.375Z',
    destination: 3,
    isFavorite: true,
    type: 'bus',
    offers: [0, 1]

  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points)
  }
  
}


export { getRandomPoint };
