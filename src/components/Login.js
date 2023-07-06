import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Form } from "react-bootstrap";
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import catLogo from '../assets/gifs/catLoading.gif';
import "./Login.css";


const Login = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationStatus, setAuthenticationStatus] = useState(null);

  const navigate = useNavigate();
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
  }, []);



  const resetPassword = async () => { //TODO create the function for when user wants to reset pw smtp 
    console.log("function resetPassword is reached")
  }

  return (
    <div className="Login">
      <h1  className= "Title"> 85c Employee Request Off Calendar </h1>
      <Form>
        <Form.Group style={{ marginBottom: "40px", fontSize: 30 }} size="lg" controlId="employeeID">
          <Form.Label>Employee ID </Form.Label>
          <Form.Control
            autoFocus
            type="employee id"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ fontSize: 30 }} size="lg" controlId="password">
          <Form.Label>Password  </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className= "login">
          <Button className = "submit-button" block="true" onClick={login} disabled={!validateForm()} style={{ margin: "20px" }} >
            Login
          </Button>
          {authenticationStatus === true && <div> Success! Redirecting to Home Page</div>}
          {authenticationStatus === false && <div> Incorrect credentials, please login again</div>}
        </div>
        <div className="forgot-password">
          {/* TODO put in correct /path for href */}
        <a className= "forgot-password" href="/login" onClick={resetPassword}>Forgot Password?</a>
      </div>
      </Form>
      <h2 className="Title">Status: {authenticationStatus}</h2>
      <div className="gif">
        <img src={catLogo} alt='loading...'/>
      </div>
    </div>
    
  )
};

export default Login;