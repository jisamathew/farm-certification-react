import { useState } from "react";
import './SearchBar.css'

function SearchBar({onSubmit}) {
const [term,setTerm] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(term);
    };

    const handleChange =(event) => {
        // console.log(event.target.value)
        setTerm(event.target.value);
        // setTerm(event.target.value.replace(/[a-z]/,''));

    }
    return <div className="search-bar">
        <form onSubmit={handleFormSubmit}>
           <label>Enter Search Term</label>
            <div className="input-group mb-3">
                <input value={term} onChange = {handleChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                {/* {term.length > 4 && 'Term must be 3'} */}
            </div>
        </form>

    </div>
}
export default SearchBar;

// function SearchBar({onSubmit}) {
//     const handleClick = () => {
//         onSubmit('cars');
//     }

//     return <div>
//         <div className="input-group mb-3">
//             <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
//             <span className="input-group-text"  onClick={handleClick} id="inputGroup-sizing-default">Search</span>

//         </div>
//     </div>
// }
// export default SearchBar;