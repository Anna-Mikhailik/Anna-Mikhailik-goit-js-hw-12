import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48906528-865b601cba228060b80f58b51';
const PER_PAGE = 40;

export async function fetchImages(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return { hits: [], totalHits: 0 };
  }
}
