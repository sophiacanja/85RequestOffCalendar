import React, { useState } from 'react';
import Axios from 'axios';
import EmployeeTable from './EmployeeTable.js'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './EmployeeTable.css';
import './AdminManagement.css';
const AdminManagement = () => {
    const [addUser, setAddUser] = useState(false)
    const [newUserData, setNewUserData] = useState({})

    //handles all the input variables made in the AddEmploye section and sets the useState variable newUserData
    //sets useState var with the key:value pairs of the given event (ex: [firstName] : Sophia)
    const handleAddEmployee = (event) => {
        const name = event.target.name; 
        const value = event.target.value; 

        //casts the value employeeID to a number to follow UserModel format 
        if(name === "employeeID") {
            setNewUserData(values => ( 
                {...values, [name]: Number(value)}  
            ))
        } else { 
            //sets values to a string 
            setNewUserData(values => (
                {...values, [name]: value}
            ))
        }
    }

    //creates a new employee and adds them to the database and updates the table
    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            //calls api endpoint to add new user into database
            const response = await Axios.post('http://localhost:4000/users/createUser', newUserData)

            if(response.data.success){
                console.log('USER CREATED', response.data.data)
                window.location.reload()
            }
            else {
                console.log("ERROR IN CREATING USER")    
            }
        } catch (err) {
            console.log(err)
        } 
      }
    

return ( 
    <Container className = "AdminManagement" fluid="lg" >
            <EmployeeTable />
            <div className= "AddEmployeeSection"> 
                <Button onClick = { ()=> setAddUser(true)} className="AddEmployeButton"  > Add Employee </Button>
                {addUser === true && <Form onSubmit={ handleSubmit } className="AddEmployeeForm"> 
                    <Form.Group className="EmployeeID-textbox" controlId="employeeID">
                        <Form.Label>Employee ID </Form.Label>
                        <Form.Control 
                            type= "number"
                            name="employeeID"
                            value={ newUserData.employeeID || ''}
                            onChange={ handleAddEmployee }
                        />
                    </Form.Group>

                    <Form.Group className="firstName-textbox" controlId="firstName">
                        <Form.Label>First Name </Form.Label>
                        <Form.Control 
                            type= "text"
                            name="firstName"
                            value={ newUserData.firstName || '' }
                            onChange={ handleAddEmployee }
                        />

                    </Form.Group>

                    <Form.Group className="lastName-textbox" controlId="lastName">
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control
                            type= "text"
                            name="lastName"
                            value={ newUserData.lastName || ''}
                            onChange={ handleAddEmployee }
                         />
                    </Form.Group>

                    <Form.Group className="email-textbox" controlId="email">
                        <Form.Label>Email </Form.Label>
                        <Form.Control 
                            type= "text"
                            name="email"
                            value={ newUserData.email || ''}
                            onChange={ handleAddEmployee }
                        />
                    </Form.Group>

                    <Form.Group className="password-textbox" controlId="password">
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                            type= "text"
                            name="password"
                            value={ newUserData.password || ''}
                            onChange={ handleAddEmployee }
                        />
                    </Form.Group>
                        <Button as= "input" type="submit" className= "submitButton"/> 
                </Form> }
            </div>
    </Container>
)
}

export default AdminManagement;