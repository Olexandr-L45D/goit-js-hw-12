
import {getImage} from "./js/pixabay-api"
 import {fechGallery, refs} from "./js/render-functions"
import {renderGalleryMarkap} from "./js/render-functions"

refs.formSearchImage.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget; // посилання на елемент форми
    const photQueryValue = form.elements.searchQuery.value.toLowerCase().trim(); //значення яке написав користувач
    const searchText = event.target.searchQuery.value.trim();
  if (searchText === "") {
    fechGallery('outdata');
    return;
  }
     refs.gallery.innerHTML = '';
     refs.loader.classList.add('loader');
   
    getImage(photQueryValue)
    .then(data => {
      renderGalleryMarkap(data.hits)
      refs.loader.classList.remove('loader');
      if (data.totalHits === 0) {
          fechGallery('nodata');  
    }
  }).catch(error => {
    refs.loader.classList.remove('loader');
    
        fechGallery(error);
          })
    .finally(() => 
        form.reset()); //очистка тексту в інпуті
    
}

//  if (data.hits === 0) 