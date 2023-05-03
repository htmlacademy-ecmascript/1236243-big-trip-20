import { getRandomArrayElement, getRandomInteger} from '../utils.js'


const points = [
    {
        'id': 1,
        'basePrice': getRandomInteger(400, 800),
        'dateFrom': '2022-07-10T22:55:56.845Z',
        'dateTo': '2022-07-11T11:22:13.375Z',
        'destination': 1,
        'isFavorite': false,
        'offers': [1, 2, 3],
        'type': 'check-in'
    },
    {
        'id': 2,
        'basePrice': getRandomInteger(400, 800),
        'dateFrom': '2022-10-10T22:55:56.845Z',
        'dateTo': '2022-10-11T11:22:13.375Z',
        'destination': 2,
        'isFavorite': true,
        'offers': [[1, 2, 3]],
        'type': 'drive'
    },
    {
        'id': 3,
        'basePrice': getRandomInteger(400, 800),
        'dateFrom': '2023-05-01T22:55:56.845Z',
        'dateTo': '2023-06-24T11:22:13.375Z',
        'destination': 3,
        'isFavorite': false,
        'offers': [1, 2, 3, 4, 5],
        'type': 'restaurant'
    },
    {
        'id': 4,
        'basePrice': getRandomInteger(400, 800),
        'dateFrom': '2023-07-10T22:55:56.845Z',
        'dateTo': '2023-07-11T11:22:13.375Z',
        'destination': 3,
        'isFavorite': true,
        'offers': [1, 2],
        'type': 'bus'
    },
]

const getRandomPoint = () => {
    return getRandomArrayElement(points)
}

export { getRandomPoint }