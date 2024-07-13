
import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";
//axios.defaults.baseURL = BASE_URL;  //тут посилання на базовий УРЛ
//ENDPOINT = "";


      const params = {
        //apiKey: API_KEY,
        q: "",
        page: 1,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        //language: "en"
      };
      
      export function generateSearchstr(searchText) {
        params.q = searchText;
        const neWurls = new URLSearchParams(params);
        return `https://pixabay.com/api/?${neWurls}`;
        
    }
    
     function getAsyncImage({ q = "", page = 1, per_page = 15}={}) {
      return axios.get(`${BASE_URL}?key=${API_KEY}`, {
        params: {
           q, page, per_page
        }
      }).then(({data}) => data);
        
    }
    export {getAsyncImage};






















    
    // const doStuff = async () => {
    //   try {
    //     const users = await getAsyncImage();
    //     console.log(users);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    
    // doStuff();
    // export {doStuff}




     
//example  try...catch (error)
    //  try {
    //   const result = 10 / 0;
    //   console.log(result); // Цей рядок не виконається через помилку
    // } catch (error) {
    //   // Обробимо помилку
    //   console.error(error.message);
    // }

      // export function getAsyncImage(qveryURL) {
      //   return fetch(qveryURL).then(response => {
      //     if (!response.ok) {
      //       throw new Error(response.status);
      //     }
      //     return response.json();
      //   });
      // }

// приклад простого запису асінк з АХСІОС
//       const fetchUsers = async () => {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//         return response.data;
//       };
      
//       fetchUsers()
//         .then(users => console.log(users));

 // далі треба використати клас URLSearchParams (_limit: 15,) (цей ліміт вже вказав в обєкті searchSettings)
// це ліміт на 15 зображень в одному запиті(на базі прототипу URLSearchParams )
// const searchParams = new URLSearchParams({
//     _limit: 15,
//     _sort: "name",
//   });
      


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


   