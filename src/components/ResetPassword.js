import React, { useState, useEffect } from 'react';
import Axios from 'axios';

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


  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('instance');

  useEffect(() => {
    const CheckForValidInstanceToken = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": token } });
        console.log(response);

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

  const updatePassword = async () => {

  }

//TODO fix this (race condition; keeps printing userInfo first and does not wait for the pw to be updated )
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page from automatically reloading when hitting submit
    // if (password === secondPassword) {
      // check for regex, if passes then update password in database

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [e.target.name]: password,
      }));
      
      setTimeout(() => {
        console.log(userInfo);
      }, 3000);
    }
  
  const testSubmit = async (e) => {
    await updateUserInfo();

    console.log(userInfo);
  }

  const updateUserInfo = async () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ["password"]: password,
    }));
  }



  return (
    <div>
      {(() => {
        if (stillVerifyingToken === true) {
          return (
            <>
              <h2>Loading...</h2>
            </>
          )
        } else if (authStatus === "error") {
          return (
            <>
              <h2>Error</h2>
            </>
          )
        } else if (authStatus === "expired") {
          return (
            <>
              <h2>Expired</h2>
            </>
          )
        } else if (authStatus === "invalid token") {
          return (
            <>
              <h2>Invalid token</h2>
            </>
          )
        } else if (authStatus === "success") {
          return (
            <>
              <h2>Please enter your new password</h2>
              <form
                onSubmit={handleSubmit}
                name="password">
                <div>
                  <label>Enter New Password:</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    onChange={(e) => setSecondPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Set New Password</button>
              </form>
              <button type="submit" onClick={testSubmit}>hello</button>
            </>
          )
        }
      })() /* IIFE immediately invoked function expression */}
    </div>
  )
};

export default ResetPassword;