export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22998776-fe1d89aff15cc96b76b12cb7b`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.page += 1;

        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  //   get query() {
  //     return this.searchQuery;
  //   }

  //   set query(newQuery) {
  //     this.searchQuery = newQuery;
  //   }
}
