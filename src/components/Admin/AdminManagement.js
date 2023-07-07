import React, { useEffect, useState} from 'react';
import { useTable } from 'react-table';
import Axios from 'axios';

const AdminManagement = () => {
  const [data, setData] = useState([])

  useEffect( () => {
    
    //defining user data needed for table
    const getUserData = async () => {
      try {
        //api call to retreive all non-sensitive information from all users
        const response  = await Axios.get('http://localhost:4000/users/getAllUsers')
        //setting the  useState variable to the array with all employee information from database
        setData(response.data.data)
       
      } catch (err) {
        console.log(err)
      }
    }

    getUserData();
  }, []);



  //defining columns needed for table
  const columns = React.useMemo(() => [
    {Header: 'Employee ID', accessor: 'employeeID'},
    {Header: 'First Name', accessor: 'firstName'},
    {Header: 'Last Name', accessor: 'lastName'},
    {Header: 'Email', accessor: 'email'}
    ], []);

  
  //defines the functions needed to construct the table
  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows,
    prepareRow,
  } = useTable({columns, data}); //assigining the columns and data fields we assigned above to use for the table




  return (
    <div className= 'AdminManagementTable'>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(columns => (
                <th {...columns.getHeaderProps()}>
                  {columns.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr{...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
                <button>
                    Delete
                </button>
              </tr>
              
            )
          })}
        </tbody>
      </table>
    </div>          
  );
};

export default AdminManagement;
