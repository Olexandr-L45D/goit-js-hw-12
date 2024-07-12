// запит фечь з бібліотеки за допомогою axios і асинхронної функції async/await
import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';//тут посилання на базовий УРЛ
const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";
axios.defaults.headers.common["hits"] = API_KEY; // назва заголовка

//   // return (await axios.get(`${urlRaqeuestes}&${searchParams}`)).data
// такий варіант передачі KEY та параметрів
      const searchSettings = {
        key: '44760113-b733d2f51a4c6409aa3483a05',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
      };
      
      export function generateSearchstr(searchText) {
        searchSettings.q = searchText;
        const neWurls = new URLSearchParams(searchSettings);
        return `https://pixabay.com/api/?${neWurls}`;
    }
     
    async function getAsyncImage(searchText) {
      //return fetch(qveryURL)
        return (await axios.get(`key=${API_KEY}&${searchText}`)).data
    }
      
     export {getAsyncImage}

      // export function getAsyncImage(qveryURL) {
      //   return fetch(qveryURL).then(response => {
      //     if (!response.ok) {
      //       throw new Error(response.status);
      //     }
      //     return response.json();
      //   });
      // }

 // далі треба використати клас URLSearchParams (_limit: 15,)
// це ліміт на 15 зображень в одному запиті(на базі прототипу URLSearchParams )
// const searchParams = new URLSearchParams({
//     _limit: 15,
//     _sort: "name",
//   });
      // neWurls = {
      //   _limit: 15,
      //   _sort: "q",
      // }


  // export function getImage(str) {
  //   const BaSe_URL ="https://pixabay.com/api/";
  //   const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";
  //   const imageType = 'photo';
  //   const orientat = "horizontal";
  //   const safesearch = true;
  //   const urlRaqeuestes = `${BaSe_URL}?key=${API_KEY}&q=${str}&image_type${imageType}&orientation=${orientat}&safesearch=${safesearch}`
  //   return fetch(urlRaqeuestes).then(response => { 
  //       //console.log(response); 
  //       if (!response.ok) {
  //         throw new Error(response.status); 
  //       }
  //       return response.json(); 
  //     }
  //     );}


   