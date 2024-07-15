//2 functions more

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.settings({
  timeout: 2500,
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
  titleSize: 25,
  messageSize: 25,
  backgroundColor: 'rgba(255, 182, 66, 0.8)',
});
var lightbox = new SimpleLightbox('.gallery a', { captionDelay: 200, captionsData: 'alt'  });

export const refs = {
  formSearchImage: document.querySelector(".uzers-form-image"),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'), //  це прислуховуєм кнопку з спінером
  spinnerText: document.querySelector(".spinner-text") // це спінер тектом під кнопкою
};

const galleryContainer = document.querySelector('.gallery'); // function створює розмітку для галереї
galleryContainer.addEventListener('submit', renderGalleryMarkap);

   export function renderGalleryMarkap(images) {
    const element = document.getElementsByClassName(".gallery");
    element.innerHTML = "";
    const markup = images
    .map((image) =>  
      ` 
    <li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}">
    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" title="${image.name}"/></a>
    <div class="gallery-paragraf">
    <p class="gallery-commant">likes ${image.likes}</p>
    <p class="gallery-commant">views ${image.views}</p>
    <p class="gallery-commant">comments ${image.comments}</p>
    <p class="gallery-commant">downloads ${image.downloads}</p>
    </div>
    </li> 
     ` )
      .join("")
      galleryContainer.insertAdjacentHTML("beforeend", markup);
      lightbox.refresh();
      
  };

// функція виклика повідомлення про помилку and iziToast

export function handlerErrorUzer(error) {
  switch (error)
    {
    case 'outdata':
      iziToast.warning({
        title: 'Error',
        message: 'Введіть данні для пошуку!',
      });
      break;
    case 'nodata':
      iziToast.warning({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      break;
    default:
      iziToast.error({
        title: 'Error',
        message: 'Щось пішло не так. Ми працюемо над вирішенням питання!',
      });
      break;
  }
}


// const hiddenBattonClass = "is-hidden";
const hiddenBattonClass = "hidden";
// взагалі зникає (коли кінець колекції або до запиту(до сабміту))
function hiden(button) {
  button.classList.add(hiddenBattonClass);
} // активна
function show(button) {
  button.classList.remove(hiddenBattonClass);
} // при запиті відображається але не активна для натискання і прелоудер-show this spinner
function disable(button, spinner ) {
  button.disabled = true;
  spinner.classList.remove(hiddenBattonClass);
} // -show this button and hide this spinner
//  function enable(button, spinner) {
//   button.disabled = falce; 
//   spinner.classList.add(hiddenBattonClass);
//  }
export {hiden, show, disable};


