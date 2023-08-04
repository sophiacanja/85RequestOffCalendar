import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./EmployeeTable.css";

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [adminStatus, setAdminStatus] = useState([]);


  useEffect(() => {
    //defining user data needed for table
    const getUserData = async () => {
      try {
        //api call to retreive all non-sensitive information from all users
        const response = await Axios.get('http://localhost:4000/users/getAllUsers')
        //setting the  useState variable to the array with all employee information from database
        setData(response.data.data)
        // console.log(response.data.data)
        await checkIfAdmin(response.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUserData();
  }, []);

  //helper function that creates a string array and stores the admin status of each user ("true" or "false")
  const checkIfAdmin = async (employeeData) => {
    try {
      //declare array and use the map function to extract and store the admin status of each employee
      const adminStatusArr = await Promise.all(
        employeeData.map(async (employee) => {
          //puts the admin value into the adminStatusArr 
          return employee.admin
        })
      )
      //sets the useState variable to have the array that defines the employees admin status
      setAdminStatus(adminStatusArr)

    } catch (err) {
      console.log(err)
    }
  }

  //deletes the user with the given employeeID(type:number) from the database and updates the frontend by deleting that table row
  const deleteUser = async (employeeID) => {
    try {
      //calling the deleteUser api call to delete employee from database
      await Axios.delete(`http://localhost:4000/users/deleteUser?employeeID=${employeeID}`)

      // Update the data state by removing the deleted employee from the array (this deletes the table row in the front end)
      setData((prevData) => prevData.filter((employee) => employee.employeeID !== employeeID));

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="EmployeeTableContainer bg-white">
      <h1 className="title">Manage Employees</h1>
      <Table className="EmployeeTable" striped hover bordered={true}>
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
          {data.map((employee, index) => {
            return (
              <tr key={employee.employeeID}>
                <td> {employee.employeeID} </td>
                <td> {employee.firstName} </td>
                <td> {employee.lastName} </td>
                <td> {employee.email} </td>
                {/* generates delete button for the employees who are not admin */}
                {!adminStatus.length || adminStatus[index] === "false" ? (
                  (<td> <Button onClick={() => deleteUser(employee.employeeID)} > Delete </Button></td>)
                ) : (
                  <td> </td>
                )}
              </tr>
            )
          })}

        </tbody>
      </Table>
    </div>
  )
}
export default EmployeeTable;