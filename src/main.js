

import {getAsyncImage, params} from "./js/pixaday-api"
import {handlerErrorUzer, refs} from "./js/render-functions"
import {renderGalleryMarkap} from "./js/render-functions"
import  {hiden, show, disable, enable} from "./js/render-functions" // імпортую функції які ховають кнопку -Load more і показують спінер

hiden(refs.loadMoreBtn); // приховав кнопку >Load more</button> перед самим початком як тільки завантажилась сторінка
hiden(refs.spinnerText);
refs.formSearchImage.addEventListener('submit', onFormSubmit);
let searchText = ""  // робимо функцію onFormSubmit асинхронною

 async function onFormSubmit(event) {
    event.preventDefault();
    searchText = event.target.searchQuery.value.toLowerCase().trim();  //значення яке написав користувач(прибираєм пробіл та приводим до нижн регістра)
  if (searchText === "") {
    handlerErrorUzer('outdata');
    return; }
     refs.gallery.innerHTML = '';
     params.page = 1;
    
    show(refs.loadMoreBtn); // показав кнопку >Load more<
    show(refs.spinnerText); // показав текст під кнопкою (Loading more...)
    disable(refs.loadMoreBtn, refs.spinnerText); // кнопка не активна для натискання юзером (під час завантаження, щоб не натискав багато разів)
    refs.loadMoreBtn.addEventListener("click", handleLoadMore); // прослуховуе кнопку >Load more< по кліку

    try { const {images, totalHits} = await getAsyncImage(params); //тут передаю функцію яку хочу обробити в try...catch
    params.maxPage =  Math.ceil(totalHits/ params.per_page); // розрахунок максимальної кількості сторінок 
    console.log(images, totalHits); // images - змінна- масиви який створюю в renderGalleryMarkap
       } catch (error) {
         console.log(error);
       }

     getAsyncImage(searchText)// аналогія моєї передачі, але searchText-значення з pixaday-api (searchSettings.q = searchText;)
    .then(data => {
      renderGalleryMarkap(data.hits); //тут передаю функцію, яка відмальовує розмітку
    
      if (data.totalHits === 0) {
        handlerErrorUzer('nodata');  
      }
      // if (data.hits.length > 0 || data.hits.length === totalHits) {
      // if (images.length > 0 && images.length === totalHits) {
      //   enable(refs.loadMoreBtn, refs.spinnerText); // розблоковую кнопку для натискань
      // }
     
      else {
        hiden(refs.loadMoreBtn); // ховаю кнопку якщо ні чого не виконано (або не існує того що шукаємо)
      }
      
  }).catch(error => {
   // refs.loader.classList.remove('loader'); - тут вставляю новий функціонал на кнопку та спінер!!!
    console.log(error);
    handlerErrorUzer(error);
          })
    .finally(() => 
      event.target.reset()); //очистка тексту в інпуті
    }

     // функція при події клік на кнопці яка виконую додавання нових порцій сторінок(збільшую знач пейдж на один, відключаю кнопку, після запиту на сервер відмалбовуємо розмітку і включаю кноаку як прийшов позитивний результат)
   async function handleLoadMore(params) {
      params.page += 1;
      disable(refs.loadMoreBtn, refs.spinnerText);
     try {
      const {images} = await getAsyncImage(params);
      renderGalleryMarkap(data.hits);
     } catch(error) {
       console.log(error);
       handlerErrorUzer(error);
     }
       finally {
        enable(refs.loadMoreBtn, refs.spinnerText);
        if (params.page === params.maxPage) {
          hiden(refs.loadMoreBtn);
          refs.loadMoreBtn.removeEventListener("click", handleLoadMore);
        } else {
          
        }
       }
       } 

  