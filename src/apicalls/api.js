import axios from 'axios';

const searchImages =async (term) =>{
const response = await axios.get('https://api.unsplash.com/search/photos',{
    headers:{
        Authorization:'Client-ID fe5jGXZ0_1lQSWR5BSnA6fdw49WJJIqHCJffZsvWdi4'
    },
    params:{
        query:term,
    }
});
return response.data.results;
}
export default searchImages;