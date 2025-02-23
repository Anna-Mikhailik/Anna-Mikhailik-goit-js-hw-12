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
  loadMoreBtn: document.querySelector('.load-more'), // Додаємо кнопку "Load more"
};

let searchQuery = '';
let page = 1;
const perPage = 40; // Завантажувати 40 зображень за раз
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Подія на форму пошуку
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

  // Очищуємо галерею та скидаємо сторінку
  refs.container.innerHTML = '';
  page = 1;

  // Приховуємо кнопку "Load more"
  refs.loadMoreBtn.classList.add('hidden');
  refs.loader.classList.remove('hidden');

  try {
    const images = await fetchImages(searchQuery, page, perPage);

    if (images.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Please try a different query!',
        position: 'topRight',
      });
      return;
    }

    renderValue(images.hits);

    // Якщо отримали менше 40 зображень, не показуємо кнопку "Load more"
    if (images.hits.length === perPage) {
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

// Подія на кнопку "Load more"
refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  refs.loader.classList.remove('hidden');

  try {
    const images = await fetchImages(searchQuery, page, perPage);

    if (images.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No more images found!',
        position: 'topRight',
      });
      refs.loadMoreBtn.classList.add('hidden');
      return;
    }

    renderValue(images.hits);

    // Якщо завантажили менше 40 картинок, ховаємо кнопку
    if (images.hits.length < perPage) {
      refs.loadMoreBtn.classList.add('hidden');
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
function renderValue(items) {
  const markup = imagesTemplate(items);
  refs.container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}