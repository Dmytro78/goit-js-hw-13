import './sass/main.scss';
import getRefs from './js/refs';
import ApiCards from './js/cards';
import imgCardTpl from './templates/img-card.hbs';
import Notiflix from 'notiflix';

const refs = getRefs();
const apiCards = new ApiCards();

refs.form.addEventListener('submit', onImgSearch);
refs.loadBtn.addEventListener('click', onImgLoad);

async function onImgSearch(e) {
  e.preventDefault();
  apiCards.resetPage();
  clearImgBox();
  
  refs.loadBtn.classList.add('hidden');

  apiCards.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (apiCards.searchQuery === '') {
    return;
  }

  try {
    const result = await apiCards.fetchImages();

    ImgMarkup(result.hits);

    if (result.hits.length === 0) {
      refs.loadBtn.classList.add('hidden');
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    Notiflix.Notify.success(`Hooray! We found ${result.totalHits} images.`);
    

    refs.loadBtn.classList.remove('hidden');
  } catch (error) {
    console.log(error);
  }
}

async function onImgLoad() {
  try {
    const result = await apiCards.fetchImages();
    

    if (refs.imgBox.querySelectorAll('.photo-card').length === result.totalHits) {
      getTotalImgCount();
    } else {
      ImgMarkup(result.hits);
    }
  } catch (error) {
    console.log(error);
  }
}

function ImgMarkup(data) {
  refs.imgBox.insertAdjacentHTML('beforeend', imgCardTpl(data));
}

function clearImgBox() {
  refs.imgBox.innerHTML = '';
}

function getTotalImgCount() {
  refs.loadBtn.style.display = 'none';

  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}

