import './sass/main.scss';
import ApiService from './apiService';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import { alert, notice, info, success, error } from '@pnotify/core';
// import debounce from 'lodash.debounce';

import imageTpl from './templates/gallery-list.hbs';
import { registerDecorator } from 'handlebars';
// import countryCardTpl from './templates/country.hbs';

const refs = {
  searchForm: document.querySelector('#search-form'),
  resultsContainer: document.querySelector('.js-results-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

function onSearch(e) {
  e.preventDefault();
  clearImageContainer();
  apiService.searchQuery = e.currentTarget.elements.query.value;

  if (apiService.searchQuery === '') {
    return (myError = error({
      text: 'Please enter something!',
      styling: 'brighttheme',
      delay: 3000,
      maxTextHeight: null,
      animation: 'fade',
      width: '500px',
    }));
  }
  apiService.resetPage();
  apiService.fetchImages().then(appendImageMarkup);
}

function onLoadMoreClick() {
  apiService.fetchImages().then(appendImageMarkup);
}

function appendImageMarkup(hits) {
  refs.resultsContainer.insertAdjacentHTML('beforeend', imageTpl(hits));
}

function clearImageContainer() {
  refs.resultsContainer.innerHTML = '';
}

refs.loadMoreBtn.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});

// fetchImage();

//   countryCard: document.querySelector('.country-data'),
//   cardContainer: document.querySelector('.country-list'),
//   searchInput: document.querySelector('#search-field'),
// };

// const delay = 1000;

// refs.searchInput.addEventListener('input', debounce(onInput, delay));

// function onInput(e) {
//   const query = e.target.value.trim();
//   clearMarkup();

//   if (query.length > 0) {
//     API.fetchCountry(query)
//       .then(countries => {
//         if (countries.length === 1) {
//           renderCountryCard(countries);
//         } else if (countries.length > 1 && countries.length <= 10) {
//           renderCountryList(countries);
//         } else if (countries.length > 10) {
//           const myNotice = notice({
//             maxTextHeight: null,
//             text: 'Too many matches found. Please enter a more specific query!',
//             styling: 'brighttheme',
//             delay: 3000,
//             animation: 'fade',
//             width: '600px',
//           });
//         }
//       })
//       .catch(onFetchError);
//   }
// }

// function onFetchError(er) {
//   const myError = error({
//     text: 'There is no such country. Please enter a valid name!',
//     styling: 'brighttheme',
//     delay: 3000,
//     maxTextHeight: null,
//     animation: 'fade',
//     width: '500px',
//   });
// }

// function createCountryListMarkup(countries) {
//   return countries.map(countryListTpl).join('');
// }

// function renderCountryList(countries) {
//   const markup = createCountryListMarkup(countries);
//   refs.cardContainer.innerHTML = markup;
// }

// function renderCountryCard(countries) {
//   const markup = countryCardTpl(countries);
//   refs.countryCard.innerHTML = markup;
// }

// function clearMarkup() {
//   refs.cardContainer.innerHTML = '';
//   refs.countryCard.innerHTML = '';
// }

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
