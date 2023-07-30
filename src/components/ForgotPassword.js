import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ForgotPassword.css';
import forgotPasswordBackground from "../assets/photos/forgotPasswordBackground.jpg"

const ForgotPassword = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [message, setMessage] = useState('');
  const [validSubmission, setValidSubmission] = useState(false);
  const [encryptedEmail, setEncryptedEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:4000/users/resetPassword", { employeeID: employeeID })
      createSuccessMessageAndEncryptEmail(response.data.data)
      

    } catch (error) {
      // setMessage(error.response.data.message);
      console.log(error)
    }
  };

  //this method gets the user's email and encrypts it, to be shown with the success message
  const createSuccessMessageAndEncryptEmail = async(userEmail) => {
    setValidSubmission(true);
    try{
      
        let encryptedEmail= ''
        for(let i = 0; i < userEmail.indexOf("@"); i++){
          if(i === 0 || i === 1 || i === userEmail.indexOf("@")-1) {
            encryptedEmail += userEmail[i]
          } else {
            encryptedEmail += '*'
          }
          
        }
        encryptedEmail += userEmail.substring(userEmail.indexOf("@"))
        setEncryptedEmail(encryptedEmail)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style= {{ backgroundImage: `url(${forgotPasswordBackground})`, backgroundRepeat: "no-repeat", 
      backgroundSize: "cover", height: '100vh', margin: 0, padding: 0}}>.
      {(() => {
        if (validSubmission === false) {
          return (
            <Container className="rounded" id="ForgotPasswordContainer"> 
              <Container className="justify-content-center align-items-center w-75 bg-white rounded" id="LoginFormContainer" fluid="sm">
                <Row> 
                  <h1>Forgot Password</h1>
                </Row>

                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4"> Employee ID: </Form.Label>
                      <Col sm="8">
                        <Form.Control 
                          type="Number" 
                          placeholder="Employee ID" 
                          value={employeeID}
                          onChange={(e) => setEmployeeID(e.target.value)}
                        />
                      </Col>
                  </Form.Group>

                <Row> 
                  <Button className="mb-4" type="submit">Reset Password</Button>
                </Row>
                </Form>

                {message && <div>{message}</div>}
              </Container>
            </Container>
          );
        } else {
          return (
            <Container className="rounded" id="SuccessMessageContainer"> 
              <Container className="justify-content-center align-items-center align-items-center w-75 bg-white rounded" id="SuccessMessage" fluid="sm">
              <Row> 
                <h2 id="successMessageTitle">Successful Submission!</h2>
              </Row>

              <Row id="successDescription"> 
              <p>The reset link was successfully sent to {encryptedEmail}! <br></br>Please remember to also check your spam folder.</p>
              {message && <div>{message}</div>}
              </Row>

            </Container>
            </Container>
          );
        }
      })()}
    </div>
  );

};

export default ForgotPassword;
