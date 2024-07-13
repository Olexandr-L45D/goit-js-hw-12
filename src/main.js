

import {getAsyncImage, params} from "./js/pixaday-api"
 import {handlerErrorUzer, refs} from "./js/render-functions"
import {renderGalleryMarkap} from "./js/render-functions"

refs.formSearchImage.addEventListener('submit', onFormSubmit);
let searchText = ""  // робимо функцію onFormSubmit асинхронною

 async function onFormSubmit(event) {
    event.preventDefault();
    searchText = event.target.searchQuery.value.toLowerCase().trim();  //значення яке написав користувач(прибираєм пробіл та приводим до нижн регістра)
  if (searchText === "") {
    handlerErrorUzer('outdata');
   // refs.loader.classList.add('loader');
    return;
  }
     refs.gallery.innerHTML = '';
     params.page = 1;
    // refs.loader.classList.add('loader');

    try { const {images, totalHits} = await getAsyncImage(params); //тут передаю функцію яку хочу обробити в try...catch
    params.maxPage =  Math.ceil(totalHits/ params.per_page); // розрахунок максимальної кількості сторінок 
    console.log(images, totalHits); // images - змінна- масиви який створюю в renderGalleryMarkap
       } catch (error) {
         console.log(error);
       }

     getAsyncImage(searchText)// аналогія моєї передачі, але searchText-значення з pixaday-api (searchSettings.q = searchText;)
    .then(data => {
      renderGalleryMarkap(data.hits)
     // refs.loader.classList.remove('loader');
      if (data.totalHits === 0) {
        handlerErrorUzer('nodata');  
    }
  }).catch(error => {
   // refs.loader.classList.remove('loader');
    console.log(error);
    handlerErrorUzer(error);
          })
    .finally(() => 
      event.target.reset()); //очистка тексту в інпуті
    }

    // function showMoreElem(params) { // показує елемент
    //  // refs.loader.classList.remove('loader');
    // }

    // function hiddenElement(params) { // ховає елемент
    //   //refs.loader.classList.add('loader');
    // }

 // при сабміті (після іфу) (треба це додати після першого іфу)
//  try { const {images, totalHits} = await getAsyncImage(params); //тут передаю функцію яку хочу обробити в try...catch
//  params.maxPage =  Math.ceil(totalHits/ params.per_page); // розрахунок максимальної кількості сторінок 
//  console.log(images, totalHits); // images - змінна- масиви який створюю в renderGalleryMarkap
//     } catch (error) {
//       console.log(error);
//     }
  