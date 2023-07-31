import { React, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Form } from "react-bootstrap";
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import backgroundCoffeeImage from '../assets/photos/loginBackground.jpg';

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
        window.location.reload()
        }, 1500);
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
  }, [location.state?.message]);



  const resetPassword = async () => { //TODO create the function for when user wants to reset pw smtp 
    console.log("function resetPassword is reached")
  }

  return (
   <div style={{
      backgroundImage: `url(${backgroundCoffeeImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: '90vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
      >.

    <Container className= "rounded" id="LoginContainer" fluid="lg"> 
    
    <Container className="login form justify-content-center align-items-center align-items-center w-75 bg-white rounded" id="LoginFormContainer" fluid="sm">
      <Row> 
        <div className="text-center">  
          <h1 className="Title"> Associate Login  </h1>
        </div>
      </Row>
     
      <Form className= "rounded justify-content-center"  id="LoginForm ">
          <Form.Group as={Row} controlId="employeeID">
            <Form.Label column="4"> Employee ID: </Form.Label>
              <Col sm ="8">
                <Form.Control
                  autoFocus
                  placeholder="Employee ID"
                  name="Employee ID:"
                  type="text"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                />
              </Col>
          </Form.Group>
        
          <Form.Group as={Row} className="mb-3" controlId="password">
            <Form.Label column="4"> Password: </Form.Label> 
              <Col sm="8"> 
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
          </Form.Group>

       
        <div className = "text-center mb-5">
       
          <Button as={Row} className="login-button text-white" onClick={login} disabled={!validateForm()} >
            Login
          </Button>
          {authenticationStatus === true && <div className="SuccessMessage"> Success! Redirecting to Home Page</div>}
          {authenticationStatus === false && <div> Incorrect credentials, please login again</div>}
          <Row> 
            <div className="forgot-password">
              <a className="forgot-password" href="/forgotPassword" onClick={resetPassword}>Forgot Password?</a>
            </div>
          </Row>
        </div>
      </Form>

    </Container>
    </Container>
    </div> 

  )
};

export default Login;