

import {getAsyncImage, params} from "./js/pixaday-api"
 import {handlerErrorUzer, refs} from "./js/render-functions"
import {renderGalleryMarkap} from "./js/render-functions"

refs.formSearchImage.addEventListener('submit', onFormSubmit);
let searchText = ""
function onFormSubmit(event) {
    event.preventDefault();
   // const form = event.currentTarget; // посилання на елемент форми
    //const photQueryValue = form.elements.searchQuery.value.toLowerCase().trim(); //значення яке написав користувач
    searchText = event.target.searchQuery.value.toLowerCase().trim();
  if (searchText === "") {
    handlerErrorUzer('outdata');
    return;
  }
     refs.gallery.innerHTML = '';
     params.page = 1;
     refs.loader.classList.add('loader');
     getAsyncImage(searchText)// аналогія моєї передачі, але searchText-значення з pixaday-api (searchSettings.q = searchText;)
    .then(data => {
      renderGalleryMarkap(data.hits)
      refs.loader.classList.remove('loader');
      if (data.totalHits === 0) {
        handlerErrorUzer('nodata');  
    }
  }).catch(error => {
    refs.loader.classList.remove('loader');
    console.log(error);
    handlerErrorUzer(error);
          })
    .finally(() => 
      event.target.reset()); //очистка тексту в інпуті
    
}

 //try { // тут намагаюсь дістати кількість в запиті та загальну кількість таких зображень в бібліотеці (треба це додати після першого іфу)
  //  const {articles, totalHits} = await getAsyncImage(params); тут передаю функцію яку хочу обробити в try...catch
  //     console.log(articles, totalHits);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };