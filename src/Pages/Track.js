import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchBar from '../apicalls/SearchBar';

let applicationContract;

function Track() {
    const [fetchedData, setfetchedData] = useState('');
    const { fetchBlockchainData } = useLoaderData();
    console.log('fetchBlockchainData')
    console.log(fetchBlockchainData)
    applicationContract = fetchBlockchainData[3];

    const handleSubmit = async (term) => {
        //Find if that token exist or not
        checkTokenExist(term).then((res) => {
            console.log('tokenid exist or not')
            console.log('Owner of Token');
            console.log(res)
            setfetchedData(res);
        })
        .catch(err => console.log(err));

    };

    const checkTokenExist = async (tokenId) => {
        return await applicationContract.methods.checkIfTokenExist(tokenId).call();
    }

    return <>
        <div>
            <section>
                <div className='container' >
                    <div className="container-fluid">
                        <div>
                            <br />
                            <SearchBar onSubmit={handleSubmit} />
                            <p>{fetchedData}</p>
                            {/* <ImageList images={} /> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}
export default Track;