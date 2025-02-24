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

let query = '';
let page = 1;
const perPage = 40; // Завантажуємо 40 зображень, але показуємо частинами
let allImages = []; // Масив для збереження всіх отриманих картинок
let shownImages = 0; // Лічильник показаних картинок

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Обробник події для пошуку
refs.form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  query = e.target.elements.text.value.trim();
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  // Очистити попередні результати
  refs.container.innerHTML = '';
  page = 1;
  shownImages = 0;
  allImages = [];
  
  refs.loader.classList.remove('hidden');
  refs.loadMoreBtn.classList.add('hidden');

  try {
    const response = await fetchImages(query, page, perPage);
    allImages = response.hits;

    if (allImages.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try again!',
        position: 'topRight',
      });
      return;
    }

    renderNextImages();
    
    if (allImages.length > 20) {
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

// Обробник кнопки "Load more"
refs.loadMoreBtn.addEventListener('click', async () => {
  renderNextImages();
  
  if (shownImages >= allImages.length) {
    page += 1;
    refs.loader.classList.remove('hidden');

    try {
      const response = await fetchImages(query, page, perPage);
      allImages = response.hits;
      shownImages = 0;

      if (allImages.length === 0) {
        refs.loadMoreBtn.classList.add('hidden');
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      } else {
        renderNextImages();
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Error loading more images!',
        position: 'topRight',
      });
    } finally {
      refs.loader.classList.add('hidden');
    }
  }
});

// Функція для рендеру наступних 20 зображень
function renderNextImages() {
  const nextImages = allImages.slice(shownImages, shownImages + 20);
  const markup = imagesTemplate(nextImages);
  refs.container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
  shownImages += 20;

  if (shownImages >= allImages.length) {
    refs.loadMoreBtn.classList.add('hidden');
  }
}пш