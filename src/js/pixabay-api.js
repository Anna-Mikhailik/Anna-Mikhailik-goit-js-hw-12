import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48906528-865b601cba228060b80f58b51';
const PER_PAGE = 40;

export function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => {
      if (response.data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return [];
      }
      return response.data.hits;
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later!',
        position: 'topRight',
      });
      return [];
    });
}
