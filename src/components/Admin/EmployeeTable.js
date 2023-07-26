import React, { useEffect, useState} from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const EmployeeTable= () => {
    const [data, setData] = useState([]);


    useEffect( () => {
        //defining user data needed for table
        const getUserData = async () => {
          try {
            //api call to retreive all non-sensitive information from all users
            const response  = await Axios.get('http://localhost:4000/users/getAllUsers')
            //setting the  useState variable to the array with all employee information from database
            setData(response.data.data)
            console.log(response.data.data)
          } catch (err) {
            console.log(err)
          }
        }
        getUserData();
      }, []);

return (
    <div> EMPLOYEE TABLE HERE
    <Table striped bordered hover variant="dark">
        <thead>
                <tr>
                    <th>Employee ID #</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th> 
                    <th>Delete</th> 
                </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key = {employee.employeeID}>
              <td> {employee.employeeID} </td>
              <td> {employee.firstName} </td>
              <td> {employee.lastName} </td>
              <td> {employee.email} </td>
              <td> <Button > Delete </Button></td>
            </tr>
          ))}
            
        </tbody>
    </Table>
    </div>
)
}
export default EmployeeTable;