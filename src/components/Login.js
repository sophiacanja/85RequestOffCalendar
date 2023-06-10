import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Login.css";



const Login = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);
  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  //function that checks that email and passowrd isn't blank
  function validateForm() {
    return employeeID.length > 0 && password.length > 0;
  }

  const validateLogin = async () => {
    try {
      console.log(employeeID);

      const response = await Axios.get(`http://localhost:4000/users/login?empID=${employeeID}&pw=${await encodePassword()}`);
      setLoginSuccess(true);
      console.log(response)
      localStorage.currentUserID = response.data.data._id; //TODO replace with JSON Web Tokens (JWT)
      localStorage.userIsLoggedIn = "true";

      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      console.log(err);
      setLoginSuccess(false);
      localStorage.userIsLoggedIn = "false";
    }
    await timeout(1000)
  }

  const showLoginStatus = () => {
    if (loginSuccess === true) {
      return (
        <div className="login-status success">
          <p>Loading...</p>
        </div>
      )
    } else if (loginSuccess === false) {
      return (
        <div className="login-status failure">
          <p>Invalid credentials.</p>
        </div>
      )
    } else {
      return null;
    }
  }


  //encodes password for properly passing as query parameter 
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
  }


  const resetPassword = async () => { //TODO create the function for when user wants to reset pw
    console.log("function resetPassword is reached")
  }
  return (
    <div className="Login">
      <Form>
        <Form.Group style={{ marginBottom: "40px", fontSize: 30}} size="lg" controlId="employeeID">
          <Form.Label>Employee ID </Form.Label>
          <Form.Control
            autoFocus
            type="employee id"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{fontSize: 30}} size="lg" controlId="password">
          <Form.Label>Password  </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center">
          <Button block="true" onClick={() => { validateLogin() }} disabled={!validateForm()} style={{ margin: "20px" }} >
            Login
          </Button>
          <Button variant="secondary" onClick={() => navigate('/create-account')} style={{ margin: "20px" }}>
            Create Account
          </Button>
          <Button variant="teriary" onClick={() => {resetPassword()}}>
            Reset Password  
          </Button>
        </div>
      </Form>
      {showLoginStatus()}
    </div>
  )
};

export default Login;