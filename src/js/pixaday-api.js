// 1 phold
// import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api/';//тут посилання на базовий УРЛ
// const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";
// axios.defaults.headers.common["header-name"] = API_KEY; // яка назва заголовка
// // далі треба використати клас URLSearchParams
// const searchParams = new URLSearchParams({
//     _limit: 15,
//     _sort: "name",
//   });
  
//   axios.get(`${API_KEY}?${searchParams}`);

// axios.get('/users')
//   .then()
//   .catch();

  
  export function getImage(str) {
    const BaSe_URL ="https://pixabay.com/api/";
    const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";
    const imageType = 'photo';
    const orientat = "horizontal";
    const safesearch = true;
    const urlRaqeuestes = `${BaSe_URL}?key=${API_KEY}&q=${str}&image_type${imageType}&orientation=${orientat}&safesearch=${safesearch}`
    return fetch(urlRaqeuestes).then(response => { 
        //console.log(response); 
        if (!response.ok) {
          throw new Error(response.status); 
        }
        return response.json(); 
      }
      );}