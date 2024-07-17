
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getAsyncImage, params} from "./js/pixaday-api"
import {handlerErrorUzer, refs} from "./js/render-functions"
import {renderGalleryMarkap} from "./js/render-functions"
import  {hiden, show, disable, enable} from "./js/render-functions" // імпортую функції які ховають кнопку -Load more і показують спінер

hiden(refs.loadMoreBtn); // приховав кнопку Load more - button перед самим початком як тільки завантажилась сторінка
hiden(refs.spinnerText)
refs.formSearchImage.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener("click", handleLoadMore); // прослуховуе кнопку Load more по кліку and show text-spiner
let searchText = ""  
let maxStoriges = 0;
 async function onFormSubmit(event) {  
    event.preventDefault();
    refs.gallery.innerHTML = '';
    params.page = 1;
    searchText = event.target.searchQuery.value.toLowerCase().trim();  //значення яке написав користувач(прибираєм пробіл та приводим до нижн регістра)
  
    if (searchText === "") {
    handlerErrorUzer('outdata');
    return; }
    hiden(refs.loadMoreBtn);
    disable(refs.loadMoreBtn, refs.spinnerText); // кнопка не активна для натискання юзером (під час завантаження, щоб не натискав багато разів)
    try {
     
       const data = await getAsyncImage(searchText); 
       
      maxStoriges =  Math.ceil(data.totalHits / params.per_page); // бере участь коли закінчаться запити
        
       if (data.hits.length > 0 && data.hits.length !== data.totalHits) {  
        enable(refs.loadMoreBtn, refs.spinnerText);
      } else 
      if (data.hits.length === 0) {
        handlerErrorUzer('nodata'); 
        hiden(refs.loadMoreBtn); 
        return
      }
      renderGalleryMarkap(data.hits)
      show(refs.loadMoreBtn); show(refs.spinnerText); 
    } catch (error) {
      console.log(error);
      handlerErrorUzer(error);
      hiden(refs.loadMoreBtn); hiden(refs.spinnerText); 
    } finally {
      event.target.reset(); //очистка тексту в інпуті
      hiden(refs.spinnerText)
    }
    };
    
     function handleLoadMore() {   // функція при події клік на кнопці яка виконую додавання нових порцій сторінок(збільшую знач page на один, відключаю кнопку, після запиту на сервер відмаловуємо розмітку і включаю як прийшов позитивний результат) 
      params.page += 1;
      hiden(refs.loadMoreBtn); hiden(refs.spinnerText); 
    
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
          if (params.page === maxStoriges) {
                  hiden(refs.loadMoreBtn); hiden(refs.spinnerText);
                  iziToast.error({
                    title: 'Error',
                    message: "We're sorry, but you've reached the end of search results.",
                  });
                  refs.loadMoreBtn.removeEventListener("click", handleLoadMore);
                } 
         }}, 500); // затримка сеттаймаутом на 0,5 секунди
       } ;
   
     
  
      
   