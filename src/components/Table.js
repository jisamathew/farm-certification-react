import ReactTable from 'react-bootstrap/Table';
import Pagination from './Pagination';
function Table({ data, config,keyFn }) {
  const renderedHeaders = config.map((column) => {
    return <th key={column.label}>{column.label}</th>
  })

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return(
        <td key={column.label}>
        {column.render(rowData)}
        </td>
        );
    });
    return (
      <tr key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    )
  })
  return <div>
     <ReactTable striped bordered responsive hover>
{/* <table className="table table-responsive table-striped"> */}
<thead>
        <tr>
          {renderedHeaders}
        </tr>
      </thead>
      <tbody>
        {renderedRows}
      </tbody>
    {/* </table> */}
     </ReactTable>
    {/* <Pagination /> */}
  </div>
}
export default Table;