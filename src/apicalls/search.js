import { useState } from 'react';
import searchImages from '../apicalls/api';
import SearchBar from '../apicalls/SearchBar';
import ImageList from '../apicalls/ImageList';
function search(){
 const [images, setImages] = useState([]);

    const handleSubmit = async (term) => {
        const result = await searchImages(term);
        setImages(result);
    };

    return (
        <div>
            <section>
            <div className='container' >
                <div className="container-fluid">
                    <div>
                        <br />
                        <SearchBar onSubmit={handleSubmit} />
                        <ImageList images={images} />
                    </div>
                </div>
            </div>
            </section>
        </div>

    )
   
}
 // or even a graphql endpoint
 function loader({ request, params }) {
    return fetch("/_gql", {
      signal: request.signal,
      method: "post",
      body: JSON.stringify({
        query: gql`...`,
        params: params,
      }),
    });
  }
export default search;