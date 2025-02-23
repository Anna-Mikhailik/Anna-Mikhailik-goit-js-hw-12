import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

const refs = {
  container: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let searchQuery = '';
let page = 1;
const perPage = 40;
let totalHits = 0;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функція обробки форми пошуку
refs.form.addEventListener('submit', async e => {
  e.preventDefault();

  searchQuery = e.target.elements.text.value.trim();
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  refs.container.innerHTML = '';
  refs.loadMoreBtn.classList.add('hidden');
  refs.loader.classList.remove('hidden');
  page = 1;

  try {
    const response = await fetchImages(searchQuery, page, perPage);
    totalHits = response.totalHits;

    if (response.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try another query!',
        position: 'topRight',
      });
      return;
    }

    renderImages(response.hits);

    if (totalHits > perPage) {
      refs.loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('hidden');
    e.target.reset();
  }
});

// Функція для завантаження додаткових зображень
refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  refs.loader.classList.remove('hidden');

  try {
    const response = await fetchImages(searchQuery, page, perPage);

    renderImages(response.hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      refs.loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('hidden');
  }
});

// Функція рендеру картинок
function renderImages(items) {
  refs.container.insertAdjacentHTML('beforeend', imagesTemplate(items));
  gallery.refresh();
}