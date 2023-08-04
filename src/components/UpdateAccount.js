import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import updateAccountBackground from "../assets/photos/adminManagementBackground.jpg"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import './UpdateAccount.css';

const UpdateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("stringG123");
  const [employeeID, setEmployeeID] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [formStatusMessage, setFormStatusMessage] = useState("Please fill out all the fields");
  const [formValid, setFormValid] = useState(false);

  

  const navigate = useNavigate();

  useEffect(() => {

    const FetchOriginalUserData = async () => {
      try {

        const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } });

        console.log(response.data);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
        setConfirmPassword(response.data.user.password);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setEmployeeID(response.data.user.employeeID);

      } catch (err) {
        console.log(err);
      }
    }

    FetchOriginalUserData();


    // Cleanup function (optional)
    // This function will be called when the component unmounts or before running the effect next time
    // It can be used to clean up any resources, event listeners, etc.
    return () => {
      // Perform cleanup here if needed
    };
  }, []); // Dependency array: Leave empty if the effect should only run once (on mount)


  useEffect(() => {
    const validateForm = () => {
      if (firstName.length !== 0 && lastName.length !== 0 && email.length !== 0 && password.length !== 0 && confirmPassword.length !== 0 && password === confirmPassword) {
        setFormValid(true);
        setFormStatusMessage("");
      } else {
        setFormValid(false)

        if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
          setFormStatusMessage("Please fill out all the fields");
        } else if (password !== confirmPassword) {
          setFormStatusMessage("Please make sure both passwords match");
        }
      }
    }

    validateForm();
  }, [firstName, lastName, email, password, confirmPassword]);




  /* encodes password for properly passing as query parameter */
  /*
  const encodePassword = async () => {
    const encodedPassword = password
      .replace(/ /g, '%20')
      .replace(/"/g, '%22')
      .replace(/'/g, '%27')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/&/g, '%26')
      .replace(/\+/g, '%2B')
      .replace(/,/g, '%2C')
      .replace(/\//g, '%2F')
      .replace(/:/g, '%3A')
      .replace(/;/g, '%3B')
      .replace(/=/g, '%3D')
      .replace(/\?/g, '%3F')
      .replace(/@/g, '%40')
      .replace(/#/g, '%23');
    return encodedPassword;
  };
  */


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowSubmitButton(false);
      const body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        employeeID: employeeID
      }
      const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } });
      // console.log(response.data.auth === false);
      if (response.data.auth === false) {
        const message = "Session timed out, please re-login";
        console.log("here");
        navigate('/login', { state: { message } });
        return;

      }
      await Axios.put(`http://localhost:4000/users/updateUser?employeeID=${employeeID}`, body);

      setFormStatusMessage("Success! Reloading page...");
      
      setTimeout(() => {
        window.location.reload()
      }, 1500);

    } catch (err) {
      console.log(err);
      setShowSubmitButton(true);
    }
  }


  // reverts input boxes back to original information
  /* 
  const handleRevertInfo = () => {
    setFirstName(originalFirstName);
    setLastName(originalLastName);
    setEmail(originalEmail);
    setPassword(originalPassword);
  }
  */

  return (
    <div style={{
      backgroundImage: `url(${updateAccountBackground})`, backgroundRepeat: "no-repeat",
      backgroundSize: "cover", height: '90vh', margin: 0, padding: 0
    }}>.
      <Container id="updateAccountContainer">
        <Form onSubmit={handleSubmit}>
        <Row> 
          <h1 className="FormTitle mb-4 mt-4">Update Account Information</h1>

          <Form.Group as={Col} className="EmployeeID-textbox mt-3" controlId="input">
            <Form.Label className="formLabel">Employee ID</Form.Label>
            <Form.Control
              plaintext readOnly defaultValue={employeeID}
            />
          </Form.Group>
        

          <Form.Group as={Col}className="mt-3" controlId="input">
            <Form.Label className="formLabel">First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="mt-3" controlId="input">
            <Form.Label className="formLabel">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>
          </Row>

          <Row> 
          <Form.Group as={Col} className="email-textbox mt-3" controlId="input">
            <Form.Label className="formLabel">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="password-textbox mt-3" controlId="input">
            <Form.Label className="formLabel">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} className="password-textbox mt-3" controlId="input">
            <Form.Label className="formLabel">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Form.Group>
          </Row>

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
    </div>
  );

};

export default UpdateAccount;
