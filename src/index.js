import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

import { getData } from './js/api';
import { createMarkup } from './js/markup';

import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.js-gallery');
const btnEl = document.querySelector('.js-btn');

let page = 1;
let value = '';

let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

// getData({ q: 'car' }).then(console.log);

formEl.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  try {
    e.preventDefault();
    value = e.target.elements.searchQuery.value.trim();
    if (!value) return;
    toggleBTN();
    page = 1;
    const { hits, totalHits } = await getData({ q: value, page });
    const markup = createMarkup(hits);
    clearMarkup();
    addMarkup(markup);
    lightbox.refresh();
    Notify.success(`Hooray! We found ${totalHits} images.`);
    if (hits.length === 40) {
      toggleBTN(false);
    }
  } catch (error) {
    Notify.warning(error.message);
  }
}

btnEl.addEventListener('click', onClickBtn);

async function onClickBtn() {
  try {
    page += 1;
    toggleBTN();
    const { hits, totalHits } = await getData({ q: value, page });
    const markup = createMarkup(hits);
    addMarkup(markup);
    lightbox.refresh();
    if (page * 40 < totalHits) {
      toggleBTN(false);
      return;
    }
    Notify.info("We're sorry, but you've reached the end of search results.");
  } catch (error) {
    Notify.warning(error.message);
  }
}

function clearMarkup() {
  galleryEl.innerHTML = '';
}

function addMarkup(markup = '') {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function toggleBTN(bool = true) {
  btnEl.classList.toggle('is-hidden', bool);
}
