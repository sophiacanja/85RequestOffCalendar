import React, { useEffect, useState } from 'react';
// import Axios from 'axios';

const UpdateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("stringG123");
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalLastName, setOriginalLastName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");

  useEffect(() => {

    const FetchOriginalUserData = async () => {
      try {
        // const response = await Axios.get(`http://localhost:4000/users/login?empID=77&pw=${await encodePassword()}`);
        const response = {
          firstName: "sovi",
          lastName: "sonz",
          email: "s@gmail.com",
          password: "strinG@123"
        }
        console.log(response.data);
        setOriginalEmail(response.data.data.email);
        setEmail(response.data.data.email);
        setOriginalPassword(response.data.data.password);
        setPassword(response.data.data.password);
        setOriginalFirstName(response.data.data.firstName);
        setFirstName(response.data.data.firstName);
        setOriginalLastName(response.data.data.lastName);
        setLastName(response.data.data.lastName);

      } catch (err) {
        console.log(err);
      }
    }

    FetchOriginalUserData();


    // Cleanup function (optional)
    // This function will be called when the component unmounts or before running the effect next time
    // It can be used to clean up any resources, event listeners, etc.
    return () => {
      // Perform cleanup here if needed
      
    };
  }, []); // Dependency array: Leave empty if the effect should only run once (on mount)




  /* encodes password for properly passing as query parameter */
  /*
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
  };
  */


  const handleSubmit = async () => {
    console.log("submit button clicked");
    //TODO finish submit button functionality
  }


  // reverts input boxes back to original information
  const handleRevertInfo = () => {
    setFirstName(originalFirstName);
    setLastName(originalLastName);
    setEmail(originalEmail);
    setPassword(originalPassword);
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
      <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
      </div>
      <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '1rem' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
      </div>
      <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
      </div>
      <div style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
      </div>
      <button
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 20px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>

      <button
        style={{
          backgroundColor: '#808080',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 20px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '30px'
        }}
        onClick={handleRevertInfo}
      >
        Revert
      </button>
    </div>



  );
};

export default UpdateAccount;
