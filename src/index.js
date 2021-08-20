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
