import './sass/main.scss';
import ApiService from './apiService';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';

import { alert, notice, info, success, error } from '@pnotify/core';

import imageTpl from './templates/gallery-list.hbs';
import { registerDecorator } from 'handlebars';

const refs = {
  searchForm: document.querySelector('#search-form'),
  resultsContainer: document.querySelector('.js-results-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const apiService = new ApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

const query = apiService.searchQuery;
console.log(query);

function onSearch(e) {
  e.preventDefault();
  clearImageContainer();
  apiService.searchQuery = e.currentTarget.elements.query.value.trim();

  if (apiService.searchQuery === '') {
    const myError = error({
      text: 'Please enter something!',
      styling: 'brighttheme',
      delay: 3000,
      maxTextHeight: null,
      animation: 'fade',
      width: '500px',
    });
    return;
  }
  apiService.resetPage();
  apiService.fetchImages().then(appendImageMarkup);
}

function onLoadMoreClick() {
  apiService.fetchImages().then(appendImageMarkup);
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function appendImageMarkup(hits) {
  if (hits.length === 0) {
    const myError = error({
      text: 'Nothing found!',
      styling: 'brighttheme',
      delay: 3000,
      maxTextHeight: null,
      animation: 'fade',
      width: '500px',
    });
  } else if (hits.length >= 12) {
    renderImages(true, hits);
  } else {
    renderImages(false, hits);
  }
}

function renderImages(withLoadMoreBtn, images) {
  refs.resultsContainer.insertAdjacentHTML('beforeend', imageTpl(images));
  if (withLoadMoreBtn === true) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

function clearImageContainer() {
  refs.resultsContainer.innerHTML = '';
}
