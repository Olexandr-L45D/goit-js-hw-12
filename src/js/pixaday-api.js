
import axios from 'axios';

const ENDPOINT = "https://pixabay.com/api/";
const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";


      const params = {
        key: API_KEY,
        q: "str",
        imageType: 'photo',
        orientation: "horizontal",
        safesearch: true,
        page: 1,
        per_page:15
      };

      export {params};  

  async  function getAsyncImage(searchText) {
    params.q = searchText;
     const neWurls = new URLSearchParams(params); 
    const response = await axios.get(`${ENDPOINT}?${neWurls}`)
   
      return response.data;
    };
    
    export {getAsyncImage};































    






   