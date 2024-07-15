

import {getAsyncImage, params} from "./js/pixaday-api"
import {handlerErrorUzer, refs} from "./js/render-functions"
import {renderGalleryMarkap} from "./js/render-functions"
import  {hiden, show, disable} from "./js/render-functions" // імпортую функції які ховають кнопку -Load more і показують спінер

hiden(refs.loadMoreBtn); // приховав кнопку >Load more</button> перед самим початком як тільки завантажилась сторінка
hiden(refs.spinnerText)
refs.formSearchImage.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener("click", handleLoadMore); // прослуховуе кнопку >Load more< по кліку
let searchText = ""  
params.page = 1;
 async function onFormSubmit(event) {  
    event.preventDefault();
    searchText = event.target.searchQuery.value.toLowerCase().trim();  //значення яке написав користувач(прибираєм пробіл та приводим до нижн регістра)
  if (searchText === "") {
    handlerErrorUzer('outdata');
    return; }
     refs.gallery.innerHTML = '';
     params.page = 1;
    
    disable(refs.loadMoreBtn, refs.spinnerText); // кнопка не активна для натискання юзером (під час завантаження, щоб не натискав багато разів)
    
    try {
      const data = await getAsyncImage(searchText);
      if (data.hits.length === 0) {
        handlerErrorUzer('nodata');  
        return
      }
      renderGalleryMarkap(data.hits); //тут передаю функцію, яка відмальовує розмітку (тут не можна СКРОЛ так як вона одразу прокручує вверх )
      disable(refs.loadMoreBtn, refs.spinnerText);

      refs.loadMoreBtn.addEventListener("click", createNewCard); // прослуховуе кнопку >Load more< по кліку
    } catch (error) {
      console.log(error);
      handlerErrorUzer(error);
       
    } finally {
      event.target.reset(); //очистка тексту в інпуті
      show(refs.loadMoreBtn);
    }
    };
 
     function handleLoadMore(params) {   // функція при події клік на кнопці яка виконую додавання нових порцій сторінок(збільшую знач page на один, відключаю кнопку, після запиту на сервер відмаловуємо розмітку і включаю як прийшов позитивний результат)
      hiden(refs.loadMoreBtn);
      show(refs.spinnerText); 
     //disable(refs.loadMoreBtn);
      setTimeout(async () => {try {
        const data = await getAsyncImage(searchText);
        renderGalleryMarkap(data.hits); // вставляю window.scrollBy після того як вставив в дом зображення
       const galleryItemScrol = document.querySelector('.gallery-item');
       const cardHeight = galleryItemScrol.getBoundingClientRect().height; 
        window.scrollBy({
          top: cardHeight * 2,
          behavior: "smooth",
        });
        show(refs.loadMoreBtn);
       } catch(error) {
         console.log(error);
         handlerErrorUzer(error);
       }
         finally {
          if (params.page === params.maxPage) {
                  hiden(refs.spinnerText);
                  refs.loadMoreBtn.removeEventListener("click", handleLoadMore);
                } 
         }}, 1000);
       } ;

  //  розрахунок максимальної кількості сторінок (Поки не працює)
    // try { const {markup, totalHits} = await getAsyncImage(params); //тут передаю функцію яку хочу обробити в try...catch
    // params.maxPage =  Math.ceil(totalHits / params.per_page); // розрахунок максимальної кількості сторінок 
    // // console.log(markup, totalHits); // markup - масиви який створюю в renderGalleryMarkap
    //    } catch (error) {
    //      console.log(error);
    //    }

     // Кінець колекції?
      // if (data.hits.length > 0 && data.hits.length === totalHits) {
      //   enable(refs.loadMoreBtn, refs.spinnerText); // розблоковую кнопку для натискань
      // }
       
      function createNewCard(amount) {
        params.page += 1;
    
       for (let i = 0; i < amount; i++) {
        renderGalleryMarkap(data.hits);
        
      }
       
      
      }