import React, { useState } from 'react';
import Axios from 'axios';

const ForgotPassword = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [message, setMessage] = useState('');
  const [validSubmission, setValidSubmission] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await Axios.post('/api/reset-password', { email });
      // const response = "hello";
      // setMessage(response.data.message);
      const response = await Axios.post("http://localhost:4000/users/resetPassword")
      setValidSubmission(true);
    } catch (error) {
      // setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      {(() => {
        if (validSubmission === false) {
          return (
            <div>
              <h2>Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Employee ID:</label>
                  <input
                    type="number"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Reset Password</button>
              </form>
              {message && <div>{message}</div>}
            </div>
          );
        } else {
          return (
            <div>
              <h2>Successful Submission</h2>
              {message && <div>{message}</div>}
            </div>
          );
        }
      })()}
    </div>
  );

};

export default ForgotPassword;
