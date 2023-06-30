import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Navigate } from "react-router-dom";

export const CheckIfLoggedIn = async () => {
  try {
    const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } });

    return response.data.auth;

  } catch (err) {
    console.log("ERROR: could not check if user is logged in");
    throw err;
  }
}

export const CheckForAdminAccess = async () => {
  try {
    const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } });

    return response.data.admin;

  } catch (err) {
    console.log("ERROR: could not check if user is logged in");
    throw err;
  }
}

const PrivateRouterUser = ({ children, loginNecessary, adminNecessary }) => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [isAdmin, setAdminStatus] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);
  useEffect(() => {
    const FindUserInfo = async () => {
      try {
        setLoginStatus(await CheckIfLoggedIn());
        setAdminStatus(await CheckForAdminAccess());
        setDataLoaded(true);
      } catch (err) {
        setDataLoaded(true);
        setErrorPresent(true);
      }

    }

    FindUserInfo();
  }, []);


  if(!dataLoaded){
    return <h1 style={{textAlign: 'center'}}>Loading...</h1>
  }

  if(errorPresent){
    return <h1 style={{textAlign: 'center'}}>Error: website under construction. Please try again later. Thanks!</h1>
  }


  if (adminNecessary && loginNecessary) {
    return (isLoggedIn && isAdmin) ? children : <Navigate to="/" />;
  }

  if (loginNecessary) {
    console.log(`isLoggedIn = ${isLoggedIn}`);
    return isLoggedIn ? children : <Navigate to="/login" />;
  }

  if (!loginNecessary) { // edge case for login page
    return !isLoggedIn ? children : <Navigate to="/" />;
  }
}

export default PrivateRouterUser;