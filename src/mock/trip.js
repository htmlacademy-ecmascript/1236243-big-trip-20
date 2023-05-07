import { getRandomArrayElement, getRandomInteger} from '../utils.js';
import { findOfferByType } from './offers.js';

const points = [
  {
    id: 1,
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2022-07-10T22:55:56.845Z',
    dateTo: '2022-07-11T11:22:13.375Z',
    destination: 1,
    isFavorite: false,
    type: 'check-in',
    offers: findOfferByType('check-in')

  },
  {
    id: 2,
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2022-10-10T22:55:56.845Z',
    dateTo: '2022-10-11T11:22:13.375Z',
    destination: 2,
    isFavorite: true,
    type: 'drive',
    offers: findOfferByType('drive')

  },
  {
    id: 3,
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2023-05-01T22:55:56.845Z',
    dateTo: '2023-06-24T11:22:13.375Z',
    destination: 3,
    isFavorite: false,
    type: 'restaurant',
    offers: findOfferByType('restaurant')

  },
  {
    id: 4,
    basePrice: getRandomInteger(400, 800),
    dateFrom: '2023-07-10T22:55:56.845Z',
    dateTo: '2023-07-11T11:22:13.375Z',
    destination: 3,
    isFavorite: true,
    type: 'bus',
    offers: findOfferByType('bus'),

  },
];

const getRandomPoint = () => getRandomArrayElement(points);


export { getRandomPoint };
