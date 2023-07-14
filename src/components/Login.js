import { React, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Form } from "react-bootstrap";
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import catLogo from '../assets/gifs/catLoading.gif';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cakeImage from '../assets/photos/85Bakery_redVelvet.jfif'
import Card from 'react-bootstrap/Card';

import "./Login.css";


const Login = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationStatus, setAuthenticationStatus] = useState(null);

  const location = useLocation();

  //function that checks that email and passowrd isn't blank
  function validateForm() {
    return employeeID.length > 0 && password.length > 0;
  }


  //login: Calls the login api request to verify credentials and creates a JWT. Frontend stores the token into localStorage and sets setLoginSuccess to true*
  const login = async () => {
    try {
      //api call to check credentials and create token, using the body empoyeeID and password
      const response = await Axios.post("http://localhost:4000/users/loginAndCreateToken", { employeeID: employeeID, password: password })

      //checks if the login credentials were invalid 
      if (!response.data.auth) {
        setAuthenticationStatus(false);

      } else {

        //stores token in localStorage if api request was valid
        localStorage.setItem("token", response.data.token)  //stores jwt in local storage
        setAuthenticationStatus(true);

        //waits 1.5 seconds and will navigate to the home page
        setTimeout(() => {
        }, 1500);
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    const state = location.state?.message;
    if (state !== null && state !== undefined) {
      setAuthenticationStatus(`${location.state?.message}`);
    } else {
      setAuthenticationStatus("Please enter your login credentials");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  const resetPassword = async () => { //TODO create the function for when user wants to reset pw smtp 
    console.log("function resetPassword is reached")
  }

  return (
    <div className = "loginPage"> 
    <Container className= "LoginContainer" fluid="lg"> 
  
    
    <Container className="LoginFormContainer" fluid="sm">
      <Row> 
      <div className="text-center">  
      <h1 className="Title"> 85c Login  </h1>
      </div>
      </Row>
     
      <Form className= "LoginForm" >
      <Row> 
       
        <Form.Group controlId="employeeID">
          <Form.Control
            autoFocus
            placeholder="Employee ID"
            type="text"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          />
        </Form.Group>
      </Row> 
        
        <Row> 
        <Form.Group  controlId="password">
          <Form.Control
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        </Row>
       
        <div className = "text-center">
       
          <Button className="login-button" onClick={login} disabled={!validateForm()} >
            Login
          </Button>
          {authenticationStatus === true && <div> Success! Redirecting to Home Page</div>}
          {authenticationStatus === false && <div> Incorrect credentials, please login again</div>}
        <Row> 
        <div className="forgot-password">
          {/* TODO put in correct /path for href */}
          <a className="forgot-password" href="/login" onClick={resetPassword}>Forgot Password?</a>
        </div>
        </Row>
        </div>
      </Form>

      <Row> 
      <div className="text-center">
      <div className="StatusMessage">Status: {authenticationStatus}</div>
      </div>
      </Row>

    </Container>
   
    </Container>
    
    
    
    </div>

  )
};

export default Login;