import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import "./Logout.css";

const Logout = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(null);

  //updates the isLoggedIn field 
  const logout = async () => {
    try {
      if(localStorage.userIsLoggedIn === true){
        console.log("User is logged in, logging out now")
        const status = localStorage.getItem("userIsLoggedIn")
        localStorage.setItem(false, status)
        console.log("User is logged out, status of userIsLoggedIn: ")
        console.log(localStorage.userIsLoggedIn)

      }
      else {
        console.log("User was never logged in")}
    } catch (err) {

    }
  }

  return (
    <div className="Logout verification"> Are you sure you want to log out?
      <Button block="true" onClick={() => { logout() }}> Logout </Button>
    </div>
  );
};

export default Logout;
