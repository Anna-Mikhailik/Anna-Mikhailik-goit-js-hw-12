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
let totalHits = 0; // Загальна кількість зображень

// Обробник сабміту форми
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

  refs.container.innerHTML = ''; // очищуємо галерею перед новим запитом
  refs.loader.classList.remove('hidden');
  refs.loadMoreBtn.classList.add('hidden');
  page = 1; // скидаємо сторінку на першу

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits; // отримаємо загальну кількість зображень

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, no images found for your search.',
        position: 'topRight',
      });
    } else {
      renderImages(data.hits);
      checkLoadMoreButtonVisibility();
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

// Обробник кліку на кнопку "Load more"
refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  refs.loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page, perPage);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      refs.loadMoreBtn.classList.add('hidden');
    } else {
      renderImages(data.hits);
      checkLoadMoreButtonVisibility();
      smoothScrollToNextImages(); // Плавна прокрутка
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
});

// Функція для відображення зображень
function renderImages(items) {
  const markup = imagesTemplate(items);
  refs.container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh(); // Оновлення галереї після додавання нових зображень
}

// Ініціалізація SimpleLightbox для галереї
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функція для перевірки, чи потрібно показувати кнопку "Load more"
function checkLoadMoreButtonVisibility() {
  const loadedImages = refs.container.querySelectorAll('.gallery-item').length;

  if (loadedImages >= totalHits) {
    refs.loadMoreBtn.classList.add('hidden');
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else if (loadedImages < totalHits && loadedImages % perPage === 0) {
    refs.loadMoreBtn.classList.remove('hidden');
  }
}

// Функція для плавної прокрутки після завантаження нових зображень
function smoothScrollToNextImages() {
  const firstImage = refs.container.querySelector('.gallery-item');
  if (firstImage) {
    const imageHeight = firstImage.getBoundingClientRect().height;
    window.scrollBy({
      top: imageHeight * 2, // Прокрутити на 2 висоти картки
      behavior: 'smooth',
    });
  }
}
