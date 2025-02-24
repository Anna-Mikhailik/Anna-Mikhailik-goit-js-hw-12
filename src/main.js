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
const perPage = 40;
let totalHits = 0; // для збереження загальної кількості результатів

// Обробник для сабміту форми
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

  refs.container.innerHTML = ''; // очищаємо галерею
  refs.loader.classList.remove('hidden');
  refs.loadMoreBtn.classList.add('hidden'); // ховаємо кнопку завантаження
  page = 1;

  try {
    const { hits, totalHits: fetchedTotalHits } = await fetchImages(query, page, perPage);
    totalHits = fetchedTotalHits; // зберігаємо загальну кількість результатів
    renderImages(hits);
    checkLoadMoreButtonVisibility(); // перевірка кнопки "Load more"
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'No images found. Try again!',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('hidden');
    e.target.reset();
  }
});

// Обробник для кліку по кнопці "Load more"
refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  refs.loader.classList.remove('hidden');

  try {
    const { hits, totalHits: fetchedTotalHits } = await fetchImages(query, page, perPage);
    totalHits = fetchedTotalHits; // оновлюємо загальну кількість результатів
    renderImages(hits);
    checkLoadMoreButtonVisibility(); // перевірка видимості кнопки "Load more"
    smoothScrollToNextImages(); // Плавна прокрутка
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Error loading more images!',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('hidden');
  }
});

// Функція для рендеринга зображень
function renderImages(items) {
  const markup = imagesTemplate(items);
  refs.container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh(); // оновлення SimpleLightbox
}

// Функція для перевірки, чи потрібно показувати кнопку "Load more"
function checkLoadMoreButtonVisibility() {
  const loadedImages = refs.container.querySelectorAll('.gallery-item').length;

  if (loadedImages >= totalHits) {
    refs.loadMoreBtn.classList.add('hidden'); // ховаємо кнопку "Load more", якщо більше немає результатів
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else if (loadedImages < totalHits && loadedImages % perPage === 0) {
    refs.loadMoreBtn.classList.remove('hidden'); // показуємо кнопку, якщо є ще результати
  }
}

// Функція для плавного скролінгу
function smoothScrollToNextImages() {
  const galleryItem = refs.container.querySelector('.gallery-item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
