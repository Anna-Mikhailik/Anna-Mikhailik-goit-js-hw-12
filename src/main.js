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

  refs.container.innerHTML = '';
  refs.loader.classList.remove('hidden');
  refs.loadMoreBtn.classList.add('hidden');
  page = 1;
  
  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    renderImages(data.hits);
    if (data.hits.length === perPage && totalHits > perPage) {
      refs.loadMoreBtn.classList.remove('hidden');
    }
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

refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  refs.loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    renderImages(data.hits);

    if (data.hits.length < perPage || totalHits <= page * perPage) {
      refs.loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    
    smoothScroll(); // Плавне прокручування
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

function renderImages(items) {
  const markup = imagesTemplate(items);
  refs.container.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function smoothScroll() {
  const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
