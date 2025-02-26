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
  loadMoreBtn: document.createElement('button'),
};

refs.loadMoreBtn.textContent = 'Load more';
refs.loadMoreBtn.classList.add('load-more', 'hidden');
refs.container.insertAdjacentElement('afterend', refs.loadMoreBtn);

let query = '';
let page = 1;
const perPage = 40;
let totalHits = 0;

refs.form.addEventListener('submit', async e => {
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
    const { hits, totalHits: fetchedTotalHits } = await fetchImages(
      query,
      page
    );
    totalHits = fetchedTotalHits;

    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found. Try again!',
        position: 'topRight',
      });
      return;
    }

    renderImages(hits);
    checkLoadMoreButtonVisibility();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later!',
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
    const { hits } = await fetchImages(query, page);
    renderImages(hits);
    checkLoadMoreButtonVisibility();
    smoothScrollToNextImages();
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

function checkLoadMoreButtonVisibility() {
  const loadedImages = refs.container.querySelectorAll('.gallery-item').length;

  if (loadedImages >= totalHits) {
    refs.loadMoreBtn.classList.add('hidden');
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    refs.loadMoreBtn.classList.remove('hidden');
  }
}

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
