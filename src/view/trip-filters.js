import AbstractView from '../framework/view/abstract-view.js';

function createItemFilter (filterType, isChecked) {
  const {type, count} = filterType;
  return `<div class="trip-filters__filter">
  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
</div>`;
}


function createFiltersTrip (filters) {
  const filtersTemplate = filters.map((filter, index) => createItemFilter(filter, index === 0)).join('');
  return `<form class="trip-filters" action="#" method="get">
    ${filtersTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
}

export default class FiltersTrip extends AbstractView {
  #filters = null;

  constructor ({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTrip(this.#filters);
  }
}
