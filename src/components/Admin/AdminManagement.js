import React, { useEffect, useState} from 'react';
import Axios from 'axios';
import EmployeeTable from './EmployeeTable.js'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './EmployeeTable.css'
const AdminManagement = () => {
    const [addUser, setAddUser] = useState(false)
    const [newUserData, setNewUserData] = useState({})


    const handleChange = (event) => {
        const name = event.target.name; 
        const value = event.target.value; 
        //sets useState var with the key:value pairs of the given event (ex: [firstName] : Sophia)
    
        if(name === "employeeID") {
            setNewUserData(values => ( 
                {...values, [name]: Number(value)}) )
        } else {
            setNewUserData(values => (
                {...values, [name]: value}
            ))
        }
    
    }

    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            // console.log(JSON.stringify(newUserData))
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
            <div className= "AddEmployee"> 
                <Button onClick = { ()=> setAddUser(true)} > Add Employee </Button>
                {addUser === true && <Form onSubmit={ handleSubmit }> 
                    <Form.Group className="mb-3" controlId="employeeID">
                        <Form.Label>Employee ID </Form.Label>
                        <Form.Control 
                            type= "number"
                            name="employeeID"
                            value={ newUserData.employeeID || ''}
                            onChange={ handleChange }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name </Form.Label>
                        <Form.Control 
                            type= "text"
                            name="firstName"
                            value={ newUserData.firstName || '' }
                            onChange={ handleChange }
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name </Form.Label>
                        <Form.Control
                            type= "text"
                            name="lastName"
                            value={ newUserData.lastName || ''}
                            onChange={ handleChange }
                         />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email </Form.Label>
                        <Form.Control 
                            type= "text"
                            name="email"
                            value={ newUserData.email || ''}
                            onChange={ handleChange }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password </Form.Label>
                        <Form.Control
                            type= "text"
                            name="password"
                            value={ newUserData.password || ''}
                            onChange={ handleChange }
                        />
                    </Form.Group>

                    
                    <Button as="input" type="submit" value="Submit" />
                </Form> }

            </div>
        
    </Container>
    

)

}

export default AdminManagement;