import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
                    onChange={UpdateUserInfoAndPassword}
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
            </>
          )
        }
      })() /* IIFE immediately invoked function expression */}
    </div>
  )
};

export default ResetPassword;