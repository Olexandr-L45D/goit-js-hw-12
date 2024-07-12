// запит фечь з бібліотеки за допомогою axios і асинхронної функції async/await
import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';//тут посилання на базовий УРЛ
const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";
//axios.defaults.headers = API_KEY; // назва заголовка

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
    
    async function getAsyncImage(neWurls) {
      const response = await axios.get(`/key=${API_KEY}&${neWurls}`);
      return response.data;
        //return (await axios.get(`key=${API_KEY}&${qveryURL}`)).data
    }
    export {getAsyncImage}
    //getAsyncImage().then(console.log).catch(console.log)
    //.then(data => console.log(data));
    const doStuff = async () => {
      try {
        const users = await getAsyncImage();
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    
    doStuff();
    export {doStuff}




     
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


   