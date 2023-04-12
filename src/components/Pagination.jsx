import ReactPagination from 'react-bootstrap/Pagination';
export default function Pagination({data}){
    let active = 1;
    let items = [];
  
        // items = data
        for (let number = 1; number <= 5; number++) {
            items.push(
              <ReactPagination.Item key={number} active={number === active}>
                {number}
              </ReactPagination.Item>,
            );
          }
  

    
    const paginationBasic = (
      <div>
        <ReactPagination>{items}</ReactPagination>
        <br />
      </div>
    );
    
    return(paginationBasic);
}
