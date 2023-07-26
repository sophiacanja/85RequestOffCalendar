import React, { useEffect, useState} from 'react';
import { useTable } from 'react-table';
import "./AdminManagement.css";
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const AdminManagement = () => {
  const [data, setData] = useState([])
  const [userDeleted, setUserDeleted] = useState("false")
  const [addUserStatus, setAddUserStatus] = useState(false)

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
    {Header: 'Email', accessor: 'email'},
    {Header: 'Delete'}
    ], []);

  
  //defines the functions needed to construct the table
  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows,
    prepareRow,
  } = useTable({columns, data}); //assigining the columns and data fields we assigned above to use for the table


const deleteUser = async(employeeID) => {
  try{
    //calling the deleteUser api call to delete employee from database
    await Axios.delete(`http://localhost:4000/users/deleteUser?employeeID=${employeeID}` )

    //remove deleted row from table
    setData((prevData) => prevData.filter((row) => row.employeeID !== employeeID));


  } catch (err) {
    console.log(err)
  }
}

const createUser = async() => {
  console.log("CREATE BUTTON CLICKED")
}

  return (
    <div className= 'AdminManagementTable'>
      <h1 className= 'title'> Manage Employees </h1>
      <table {...getTableProps()}>
        <thead className= 'header'>
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
              <tr{...row.getRowProps()} >
                { row.cells.map((cell, index) => {
                  //checks if you are in the last column and generates the delete button
                  if( index === row.cells.length -1 ){
                    return(
                      <td {...cell.getCellProps()}>
                        <Button onClick= { () => deleteUser(row.original.employeeID) } > Delete </Button>
                      </td>
                    )
                  }
                  return (
                    //continues to populate table cells with employee info
                    <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className= 'AddEmployee'> 
        <Button onClick= {() => setAddUserStatus(true)}> Add Employee </Button>
      </div>
      {addUserStatus && <div className= "AddEmployeeSection"> <h2>Add New Employee</h2> </div> }
    </div>          
  );
};

export default AdminManagement;
