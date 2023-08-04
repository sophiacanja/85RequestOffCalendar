import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import EmployeeTable from './EmployeeTable.js'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import adminManagementBackground from "../../../assets/photos/adminManagementBackground.jpg"
import './EmployeeTable.css';
import './AdminManagement.css';

const AdminManagement = () => {
    const [newUserData, setNewUserData] = useState({});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [formStatusMessage, setFormStatusMessage] = useState("Please fill out all the fields");
    const [showSubmitButton, setShowSubmitButton] = useState(true);



    useEffect(() => {
        const validateForm = () => {

            if (newUserData.firstName !== '' && newUserData.lastName !== '' && newUserData.employeeID !== '' && newUserData.email !== '' && newUserData.password === confirmPassword) {
                setFormValid(true);
                setFormStatusMessage("");
            } else {
                setFormValid(false);

                if (newUserData.firstName === '' || newUserData.lastName === '' || newUserData.employeeID === '' || newUserData.email === '' || newUserData.password === '' || confirmPassword === '') {
                    setFormStatusMessage("Please fill out all the fields")
                } else if (newUserData.password !== confirmPassword) {
                    setFormStatusMessage("Please make sure both passwords match")
                }
            }
        }

        validateForm();
    }, [newUserData.firstName, newUserData.lastName, newUserData.employeeID, newUserData.email, newUserData.password, confirmPassword]);



    //handles all the input variables made in the AddEmploye section and sets the useState variable newUserData
    //sets useState var with the key:value pairs of the given event (ex: [firstName] : Sophia)
    const handleAddEmployee = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        //casts the value employeeID to a number to follow UserModel format 
        if (name === "employeeID") {
            setNewUserData(values => (
                { ...values, [name]: Number(value) }
            ))
        } else {
            //sets values to a string 
            setNewUserData(values => (
                { ...values, [name]: value }
            ))
        }
    }

    //creates a new employee and adds them to the database and updates the table
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            //calls api endpoint to add new user into database
            const response = await Axios.post('http://localhost:4000/users/createUser', newUserData)

            if (response.data.success) {
                console.log('USER CREATED', response.data.data)

                setFormStatusMessage("Success! Reloading page...");
                setShowSubmitButton(false);
                //waits 2 seconds and will reload page with updated user
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }

        } catch (err) {
            console.log(err)
            setFormStatusMessage(err.response.data.message);
            
        }
    }




    return (
        <div style={{
            backgroundImage: `url(${adminManagementBackground})`, backgroundRepeat: "no-repeat",
            backgroundSize: "cover", height: '90vh', margin: 0, padding: 0
        }}>.
            <Container className="AdminManagementContainer">
                <Container className="ManageEmployeesContainer" >
                    <EmployeeTable />
                </Container>

                <Container className="AddEmployeeContainer" fluid="lg" >
                    <Form onSubmit={handleSubmit} className="AddEmployeeForm">
                        <h1 className="FormTitle">Create New Employee</h1>

                        <Form.Group className="mt-3" controlId="input">
                            <Form.Label >First Name  </Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={newUserData.firstName || ''}
                                onChange={handleAddEmployee}
                            />
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="input">
                            <Form.Label>Last Name    </Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={newUserData.lastName || ''}
                                onChange={handleAddEmployee}
                            />
                        </Form.Group>

                        <Form.Group className="EmployeeID-textbox mt-3" controlId="input">
                            <Form.Label className="formLabel">Employee ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="employeeID"
                                value={newUserData.employeeID || ''}
                                onChange={handleAddEmployee}
                            />
                        </Form.Group>

                        <Form.Group className="email-textbox mt-3" controlId="input">
                            <Form.Label className="formLabel">Email </Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                // value={newUserData.email || ''}
                                // value={"hello"}
                                onChange={handleAddEmployee}
                            />
                        </Form.Group>

                        <Form.Group className="password-textbox mt-3" controlId="input">
                            <Form.Label className="formLabel">Password    </Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={newUserData.password || ''}
                                onChange={handleAddEmployee}
                            />
                        </Form.Group>

                        <Form.Group className="password-textbox mt-3" controlId="input">
                            <Form.Label className="formLabel">Confirm Password    </Form.Label>
                            <Form.Control
                                type="password"
                                name="confirm-password"
                                onChange={(event) => { setConfirmPassword(event.target.value) }}
                            />
                        </Form.Group>

                        <h3 style={{ marginTop: '25px', fontSize: "20px", textAlign: 'center', color: 'blue' }}>
                            {formStatusMessage}
                        </h3>

                        {showSubmitButton && <div className="text-center">
                            <Button
                                as="input"
                                type="submit"
                                className="submitButton"
                                disabled={formValid === false}
                            />
                        </div>}
                    </Form>
                </Container>
            </Container>
        </div>
    );

}

export default AdminManagement;