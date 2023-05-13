import { getRandomInteger } from '../utils/utils';

const OFFERS = [
  {
    type: 'taxi',
    offers: [{
      id: 0,
      title: 'Choose the radio',
      price: getRandomInteger(10, 15),
    },
    {
      id: 1,
      title: 'Choose Comfort',
      price: getRandomInteger(50, 80),
    },
    {
      id: 2,
      title: 'Choose Business',
      price: getRandomInteger(100, 150),
    },
    ]
  },
  {
    type: 'bus',
    offers: [{
      id: 0,
      title: 'Choose a seat',
      price: getRandomInteger(10, 30),
    },
    {
      id: 1,
      title: 'Choose Comfort',
      price: getRandomInteger(30, 50),
    },
    ]
  },
  {
    type: 'train',
    offers: [{
      id: 0,
      title: 'Choose a seat',
      price: getRandomInteger(20, 40),
    },
    {
      id: 1,
      title: 'Choose breakfast',
      price: getRandomInteger(50, 70),
    },
    {
      id: 2,
      title: 'Choose Comfort',
      price: getRandomInteger(80, 100),
    },
    ]
  },
  {
    type: 'ship',
    offers: [{
      id: 0,
      title: 'Choose a seat',
      price: getRandomInteger(40, 60),
    },
    {
      id: 1,
      title: 'Choose breakfast',
      price: getRandomInteger(70, 100),
    },
    {
      id: 2,
      title: 'Choose dinner',
      price: getRandomInteger(100, 150),
    },
    {
      id: 3,
      title: 'Choose Comfort',
      price: getRandomInteger(120, 180),
    },
    ]
  },
  {
    type: 'drive',
    offers: [{
      id: 0,
      title: 'Choose the radio',
      price: getRandomInteger(100, 150),
    },
    {
      id: 1,
      title: 'Choose Comfort',
      price: getRandomInteger(100, 150),
    },
    {
      id: 2,
      title: 'Choose Business',
      price: getRandomInteger(100, 150),
    },
    ]
  },
  {
    type: 'flight',
    offers: [{
      id: 0,
      title: 'Choose a seat',
      price: getRandomInteger(40, 60),
    },
    {
      id: 1,
      title: 'Glass of whiskey',
      price: getRandomInteger(70, 90),
    },
    {
      id: 2,
      title: 'Choose Business',
      price: getRandomInteger(100, 150),
    },
    ]
  },
  {
    type: 'check-in',
    offers: [{
      id: 0,
      title: 'Choose an air conditioner',
      price: getRandomInteger(30, 50),
    },
    {
      id: 1,
      title: 'Glass of whiskey',
      price: getRandomInteger(70, 90),
    },
    {
      id: 2,
      title: 'Choose Comfort',
      price: getRandomInteger(100, 150),
    },
    ]
  },
  {
    type: 'sightseeing',
    offers: [{
      id: 0,
      title: 'Choose a gid',
      price: getRandomInteger(50, 80),
    },
    {
      id: 1,
      title: 'Glass of bourbon',
      price: getRandomInteger(70, 90),
    },
    {
      id: 2,
      title: 'Choose the bus',
      price: getRandomInteger(30, 50),
    },
    ]
  },
  {
    type: 'restaurant',
    offers: [{
      id: 0,
      title: 'Choose a bottle of wine',
      price: getRandomInteger(90, 200),
    },
    {
      id: 1,
      title: 'Choose breakfast',
      price: getRandomInteger(30, 50),
    },
    {
      id: 2,
      title: 'Choose dinner',
      price: getRandomInteger(100, 150),
    },
    {
      id: 3,
      title: 'Choose music',
      price: getRandomInteger(60, 80),
    },
    {
      id: 4,
      title: 'chef\'s dish',
      price: getRandomInteger(150, 250),
    },
    ]
  }
];

const findOfferByType = function (type) {
  return OFFERS.find((el) => el.type === type);
};


export { OFFERS, findOfferByType };
