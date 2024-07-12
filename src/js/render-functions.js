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
//add code to list naxt clic
// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let limit = 40;
// // In our case total number of pages is calculated on frontend
// const totalPages = Math.ceil(100 / limit);

// fetchPostsBtn.addEventListener("click", async () => {
//   // Check the end of the collection to display an alert
//   if (page > totalPages) {
//     return iziToast.error({
//       position: "topRight",
//       message: "We're sorry, there are no more posts to load"
//     });
//   }

//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//     // Increase the group number
//     page += 1;

//     // Replace button text after first request
//     if (page > 1) {
//       fetchPostsBtn.textContent = "Fetch more posts";
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// async function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: limit,
//     _page: page
//   });

//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts?${params}`
//   );
//   return response.data;
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   postList.insertAdjacentHTML("beforeend", markup);
// }
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