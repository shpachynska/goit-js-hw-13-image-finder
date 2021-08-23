export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22998776-fe1d89aff15cc96b76b12cb7b`;
    const response = await fetch(url);

    const imgArr = await response.json();
    this.page += 1;
    console.log(imgArr.hits);
    return imgArr.hits;
  }

  resetPage() {
    this.page = 1;
  }
}

// export default class ApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async fetchImages() {
//     try {
//       const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22998776-fe1d89aff15cc96b76b12cb7b`;
//       return await fetch(url)
//         .then(response => response.json())
//         .then(data => {
//           this.page += 1;

//           return data.hits;
//         });
//     } catch (err) {
//       throw err;
//     }
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }
