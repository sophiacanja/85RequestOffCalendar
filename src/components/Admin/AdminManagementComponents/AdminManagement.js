import React, { useState } from 'react';
import Axios from 'axios';
import EmployeeTable from './EmployeeTable.js'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './EmployeeTable.css';
import './AdminManagement.css';
const AdminManagement = () => {
    const [addUser, setAddUser] = useState(false);
    const [newUserData, setNewUserData] = useState({});
    const [userCreated, setUserCreated] = useState(false);

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
                setUserCreated(true)
                //waits 2 seconds and will reload page with updated user
                setTimeout(() => {
                }, 10000);
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
    <div >
        <Container className = "EmployeeTableContainer" fluid="lg"> 
            <EmployeeTable />
        </Container>

        <Container className = "AddEmployeeContainer" fluid="lg" >

            <div className="text-center">
                <Button onClick = { ()=> setAddUser(true)} className="AddEmployeButton"  > Add Employee </Button>
            </div>

                {addUser === true && <Form onSubmit={ handleSubmit } className="AddEmployeeForm">
                    <h1 className="FormTitle"> Create New Employee</h1>
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label >First Name  </Form.Label>
                            <Form.Control 
                                type= "text"
                                name="firstName"
                                value={ newUserData.firstName || '' }
                                onChange={ handleAddEmployee }
                            />
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last Name    </Form.Label>
                            <Form.Control
                                type= "text"
                                name="lastName"
                                value={ newUserData.lastName || ''}
                                onChange={ handleAddEmployee }
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} className="EmployeeID-textbox" controlId="employeeID">
                            <Form.Label  className="formLabel">Employee ID / Username</Form.Label>
                            <Form.Control 
                                type= "number"
                                name="employeeID"
                                value={ newUserData.employeeID || ''}
                                onChange={ handleAddEmployee }
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="password-textbox" controlId="password">
                            <Form.Label className="formLabel">Password    </Form.Label>
                            <Form.Control
                                type= "text"
                                name="password"
                                value={ newUserData.password || ''}
                                onChange={ handleAddEmployee }
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group  className="email-textbox" controlId="email">
                        <Form.Label  className="formLabel">Email </Form.Label>
                        <Form.Control 
                            type= "text"
                            name="email"
                            value={ newUserData.email || ''}
                            onChange={ handleAddEmployee }
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button as= "input" type="submit" className= "submitButton"/> 
                        {userCreated && <div className="SuccessMessage"> SUCCESS! NEW EMPLOYEE ADDED </div>}
                    </div>
                    
                </Form> }      
        </Container>
    </div>
);

}

export default AdminManagement;