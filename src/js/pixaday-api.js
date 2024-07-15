
import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "44760113-b733d2f51a4c6409aa3483a05";
axios.defaults.baseURL = BASE_URL;  //тут посилання на базовий URL on axios

      const params = {
        key: API_KEY,
        q: "str",
        page: 1,
        per_page: 15,
        image_type: "imageType",
        orientation: 'horizontal',
        safesearch: true,
        maxPage: 0 // додатковий параметр(який я потім порахую) для обчислення останньої сторінки
      };

      export {params};  

  async  function getAsyncImage(searchText) {
    params.q = searchText;
     const neWurls = new URLSearchParams(params);  
    const response = await axios.get(`?${neWurls}`)
      return response.data;
    };
    
    export {getAsyncImage};































    






   