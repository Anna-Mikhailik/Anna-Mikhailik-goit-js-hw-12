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
let totalHits = 0;

// 1️⃣ Обробник події сабміту форми
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

  refs.container.innerHTML = ''; // Очищення галереї
  refs.loader.classList.remove('hidden'); // Показуємо лоадер
  refs.loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку завантаження
  page = 1;

  try {
    const { hits, totalHits: fetchedTotalHits } = await fetchImages(query, page, perPage);
    
    totalHits = fetchedTotalHits; // Оновлення загальної кількості результатів
    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try again!',
        position: 'topRight',
      });
      return;
    }

    renderImages(hits);
    checkLoadMoreButtonVisibility(); // Перевіряємо кнопку "Load more"

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later!',
      position: 'topRight',
    });
  } finally {
    refs.loader.classList.add('hidden'); // Приховуємо лоадер
    e.target.reset();
  }
});

// 2️⃣ Обробник кліку на кнопку "Load more"
refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  refs.loader.classList.remove('hidden');

  try {
    const { hits } = await fetchImages(query, page, perPage);

    if (hits.length === 0) {
      refs.loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    renderImages(hits);
    checkLoadMoreButtonVisibility(); // Перевіряємо кнопку "Load more"
    smoothScrollToNextImages(); // Плавний скролінг

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

// 3️⃣ Функція рендерингу зображень
function renderImages(items) {
  const markup = imagesTemplate(items);
  refs.container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh(); // Оновлення SimpleLightbox
}

// 4️⃣ Функція перевірки, чи потрібно показувати кнопку "Load more"
function checkLoadMoreButtonVisibility() {
  const loadedImages = refs.container.querySelectorAll('.gallery-item').length;

  if (loadedImages >= totalHits) {
    refs.loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку "Load more"
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    refs.loadMoreBtn.classList.remove('hidden'); // Показуємо кнопку, якщо є ще результати
  }
}

// 5️⃣ Функція для плавного скролінгу
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

// 6️⃣ Налаштування SimpleLightbox
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
