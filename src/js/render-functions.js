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
  loader: document.querySelector('.loader'),
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

const loadMoreBtn = document.querySelector('[data-action="load-more"]'); //  це прислуховуєм кнопку з спінером
const spinner = document.querySelector(".spinner")

const hiddenElementList = "is-hidden";
// взагалі прирати (коли кінець колекції або до запиту(до сабміту))
function hide(button) {
  button.classList.add(hiddenElementList);
}
// активна
function show(button) {
  button.classList.remove(hiddenElementList);
}
// при запиті відображається але не активна для натискання і крутиться прелоудер-show this spinner
function disable(button, spinner ) {
  button.disable = true;
  spinner.classList.remove(hiddenElementList);
}
// -show this button and hide this spinner
 function enable(button, spinner) {
  button.disable = falce; 
  spinner.classList.add(hiddenElementList);
 }
export default {hide,
  show, disable, enable};

// приклад асинхронної стрілочної функції 
// const doStuff = async () => {
    //   try {
    //     const users = await getAsyncImage(); тут передаю функцію яку хочу обробити в try...catch
    //     console.log(users);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    
    // doStuff();
    // export {doStuff}

//add code to list naxt clic
//  const fetchPostsBtn = document.querySelector(".js-btn");// це кнопка перегортання далі на нову стаорінку при кліку
//  const postList = document.querySelector(".posts");// це ул куди при кліку додаємо нову сторінку (та сама галерея)

// let page = 1;
// let limit = 10;
// // In our case total number of pages is calculated on frontend
// const totalPages = Math.ceil(100 / limit);

// fetchPostsBtn.addEventListener("click", async () => {
//   // Check the end of the collection to display an alert (якщо колекція закінчилась)
//   if (page > totalPages) {
//     return iziToast.error({
//       position: "topRight",
//       message: "We're sorry, but you've reached the end of search results."
//     });
//   }

//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts); // Increase the group number
//     page += 1;
//     if (page > 1) {
//       fetchPostsBtn.textContent = "Fetch more posts";  // Replace button text after first request
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
// //У відповіді бекенд повертає властивість totalHits — загальна кількість зображень
// async function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: limit,
//     _page: page
//   });

//   const response = await axios.get(
//     `key=${API_KEY}/posts?${params}`
//   );
//   return response.data;
// }

//  function renderPosts(images) {

// const element = document.getElementsByClassName(".posts");
//     element.innerHTML = "";
//     const markup = images
//     .map((image) =>  
//       ` 
//     <li class="gallery-item">
//               <h2 class="post-title">${title.slice(0, 15)}</h2>
//     <a class="gallery-link" href="${image.largeImageURL}">
//     <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" title="${image.name}"/></a>
//     <div class="gallery-paragraf">
//     <p class="gallery-commant">likes ${image.likes}</p>
//     <p class="gallery-commant">views ${image.views}</p>
//     <p class="gallery-commant">comments ${image.comments}</p>
//     <p class="gallery-commant">downloads ${image.downloads}</p>
//     </div>
//     </li> 
//      ` )
//       .join("")
//       postList.insertAdjacentHTML("beforeend", markup);
//       lightbox.refresh();
//  }

// Контролює кількість елементів в групі
//let limit = 30;
// Кількість груп в колекції
//const totalPages = Math.ceil(100 / limit);
// if (page > totalPages) {
//   return iziToast.error({
//     position: "topRight",
//     message: "We're sorry, there are no more posts to load"
//   });
// }