import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ForgotPassword.css';
import { getWeekYearWithOptions } from 'date-fns/fp';

const ForgotPassword = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [message, setMessage] = useState('');
  const [validSubmission, setValidSubmission] = useState(false);
  const [encryptedEmail, setEncryptedEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await Axios.post("http://localhost:4000/users/resetPassword", { employeeID: employeeID })
      const userEmail = await Axios.post("http://localhost:4000/users/getUserEmail", {employeeID: employeeID })
      createSuccessMessage(userEmail.data.data)
      

    } catch (error) {
      // setMessage(error.response.data.message);
      console.log(error)
    }
  };

  const createSuccessMessage = async(userEmail) => {
    setValidSubmission(true);
    try{
      
        let encryptedEmail= ''
        for(let i = 0; i < userEmail.indexOf("@"); i++){
          if(i === 0 || i === 1 || i === userEmail.indexOf("@")-1) {
            encryptedEmail += userEmail[i]
          }
          else {
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
    <div>
      {(() => {
        if (validSubmission === false) {
          return (
            <Container className="rounded" id="ForgotPasswordContainer"> 
              <Container className="justify-content-center align-items-center align-items-center w-75 bg-white rounded" id="LoginFormContainer" fluid="sm">
                <Row> 
                  <h2>Forgot Password</h2>
                </Row>

                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4"> Employee ID : </Form.Label>
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
                  <Button type="submit">Reset Password</Button>
                </Row>
                </Form>

                {message && <div>{message}</div>}
              </Container>
            </Container>
          );
        } else {
          return (
            <Container className="rounded" id="ForgotPasswordContainer"> 
              <Container className="justify-content-center align-items-center align-items-center w-75 bg-white rounded" id="LoginFormContainer" fluid="sm">
              <Row> 
              <h2>Successful Submission!</h2>
              </Row>

              <Row> 
              <p>The email was successfully sent to {encryptedEmail}! <br></br>Please remember to also check your spam folder!</p>
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
