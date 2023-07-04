import { React, useState, useEffect,useAlert } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Login.css";
// import { replaceOne } from "../../server/models/Users";



const Login = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationStatus, setAuthenticationStatus] = useState(null);

  // const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //function that checks that email and passowrd isn't blank
  function validateForm() {
    return employeeID.length > 0 && password.length > 0;
  }

  //function that returns a phrase in the frontend if the login was successful or not
  // const showLoginStatus = () => {
  //   //checks if bool value loginSuccess was already set to true
  //   if (loginSuccess === true) {
  //     return (
  //       <div className="login-status success">
  //         <p>Loading...Success</p>
  //       </div>
  //     )
  //   } else if (loginSuccess === false) {
  //     return (
  //       <div className="login-status failure">
  //         <p>Invalid credentials.</p>
  //       </div>
  //     )
  //   } else {
  //     return null;
  //   }
  // }

  //login: Calls the login api request to verify credentials and creates a JWT. Frontend stores the token into localStorage and sets setLoginSuccess to true*
  const login = async () => {
    try {
      //api call to check credentials and create token, using the body empoyeeID and password
      const response = await Axios.post("http://localhost:4000/users/loginAndCreateToken", { employeeID: employeeID, password: password })
      // console.log(response)
      //checks if the login credentials were invalid 
      console.log(response);
      if (!response.data.auth) {
        // setLoginSuccess(false);
        setAuthenticationStatus(false);
    
      } else {
        // console.log(response.data);
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

  //userAuthenticated: Calls the isUserAuth api request
  //note: use "response.data" to access data: {auth, admin, message, user} 
  const userAuthenticated = async () => {    
    try {
      //api request call to verify jwt access 
      const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } })
      if (!response) {
        console.log("User is not authenticated")
      } else {
        //if api call went through console log the response that was given back
        console.log(response)
        
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

    // eslint-disable-next-line
  }, []);



  const resetPassword = async () => { //TODO create the function for when user wants to reset pw smtp 
    console.log("function resetPassword is reached")
  }
  return (
    <div className="Login">
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
        <div className="d-flex justify-content-between align-items-center">
          <Button block="true" onClick={login} disabled={!validateForm()} style={{ margin: "20px" }} >
            Login
          </Button>
          {authenticationStatus === true && <div> Success! Redirecting to Home Page</div>}
          {authenticationStatus === false && <div> Incorrect credentials, please login again</div>}
          <Button variant="secondary" onClick={() => navigate('/create-account')} style={{ margin: "20px" }}>
            Create Account
          </Button>
          <Button variant="teriary" onClick={() => { resetPassword() }}>
            Reset Password
          </Button>
        </div>
      </Form>
      {/* {showLoginStatus()} */}
      <button onClick={userAuthenticated}> Check if Authenticated </button>
      <h2>Status: {authenticationStatus}</h2>
    </div>
  )
};

export default Login;