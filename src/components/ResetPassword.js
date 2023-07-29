import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ResetPassword.css';
import resetPasswordBackground from "../assets/photos/forgotPasswordBackground.jpg"


const ResetPassword = () => {
  // "http://localhost:3000/resetPassword?instance=123"


  /*
      extract the token from the url 

      need to check for valid token
      
      need to check for valid password input

      if successfully entered valid password, show prompt saying new password has been saved, and reload page after 5 seconds
  */
  const [stillVerifyingToken, setStillVerifyingToken] = useState(true);
  const [authStatus, setAuthStatus] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('instance');

  useEffect(() => {
    const CheckForValidInstanceToken = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": token } });
        // console.log(response);

        if (response.data.message === "Token expired") {
          setAuthStatus("expired");
        } else if (response.data.message === "We need a token" || response.data.message === "Invalid token") {
          setAuthStatus("invalid token");
        } else {
          setAuthStatus("success")
          setUserInfo({
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            employeeID: response.data.user.employeeID,
            email: response.data.user.email
          })
        }
      } catch (err) {
        console.log(err);
        setStillVerifyingToken(false);
        setAuthStatus("error");
      }

      setStillVerifyingToken(false);
    };

    CheckForValidInstanceToken();// eslint-disable-next-line
  }, []);


  //TODO put the rules for valid pw
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from automatically reloading when hitting submit


    if (password === secondPassword) {
      try {
        const response = await Axios.put(`http://localhost:4000/users/updateUser?employeeID=${userInfo.employeeID}`, userInfo);
        console.log(response);

        //waits 1.5 seconds and will navigate to the home page
        setTimeout(() => {
          navigate('/login');
        }, 1500);

      } catch (err) {
        console.log(err);
      }
    }
  }


  const UpdateUserInfoAndPassword = (e) => {
    setPassword(e.target.value);
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      "password": e.target.value,
    }));
  }


  return (
    <div style= {{ backgroundImage: `url(${resetPasswordBackground})`, backgroundRepeat: "no-repeat", 
      backgroundSize: "cover", height: '100vh', margin: 0, padding: 0}}>.
      
    <Container className="rounded" id="ResetPasswordContainer">
    <Container className="justify-content-center align-items-center align-items-center w-75 bg-white rounded" id="LoginFormContainer" fluid="sm">
      {(() => {
        if (stillVerifyingToken === true) {
          return (
            <Row> 
              <h2>Loading...</h2>
            </Row>
          )
        } else if (authStatus === "error") {
          return (
            <Row> 
              <h2>Error</h2>
            </Row>
          )
        } else if (authStatus === "expired") {
          return (
            <Row> 
              <h2>Expired</h2>
            </Row>
          )
        } else if (authStatus === "invalid token") {
          return (
            <Row>
              <h2>Invalid token</h2>
            </Row>
          )
        } else if (authStatus === "success") {
          return (
            <Row>
              <h2>Please enter your new password</h2>
              <p> Passwords must be a minimum of 8 characters and must contain at least one 
                numerical digit (0-9), one upper case letter, and one lower case letter </p>
              <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} className="mb-3"> 
                      <Form.Label column sm="5"> Enter New Password:</Form.Label>
                      <Col sm="7">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={UpdateUserInfoAndPassword}
                        required
                      />
                      </Col>
                      </Form.Group>
            
                  <Form.Group as={Row} className="mb-3"> 
                    <Form.Label column sm="5">Confirm Password:</Form.Label>
                    <Col sm="7">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setSecondPassword(e.target.value)}
                      required
                    />
                    </Col>
                  </Form.Group>

                <Row> 
                  <Button type="submit">Set New Password</Button>
                </Row>
                </Form>
            </Row>
          )
        }
      })() /* IIFE immediately invoked function expression */}
    </Container>
    </Container>
    </div>
  )
};

export default ResetPassword;