
//import {getImage} from "./js/pixaday-api"
import {getAsyncImage, generateSearchstr, doStuff} from "./js/pixaday-api"
 import {handlerErrorUzer, refs} from "./js/render-functions"
import {renderGalleryMarkap} from "./js/render-functions"
//console.log(doStuff);


refs.formSearchImage.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget; // посилання на елемент форми
    const photQueryValue = form.elements.searchQuery.value.toLowerCase().trim(); //значення яке написав користувач
    const searchText = event.target.searchQuery.value.trim();
  if (searchText === "") {
    handlerErrorUzer('outdata');
    return;
  }
     refs.gallery.innerHTML = '';
     refs.loader.classList.add('loader');
     getAsyncImage(generateSearchstr(searchText))// аналогія моєї передачі, але searchText-значення з pixaday-api (searchSettings.q = searchText;)
     //getAsyncImage(photQueryValue)
    //getImage(photQueryValue)// те саме!
    .then(data => {
      renderGalleryMarkap(data.hits)
      refs.loader.classList.remove('loader');
      if (data.totalHits === 0) {
        handlerErrorUzer('nodata');  
    }
  }).catch(error => {
    refs.loader.classList.remove('loader');
    
    handlerErrorUzer(error);
          })
    .finally(() => 
        form.reset()); //очистка тексту в інпуті
    
}

