// import React from 'react';
import Axios from 'axios';

export const CheckForAdminAccess = async (empID) => {
    const response = await Axios.get(`http://localhost:4000/users/userIsAdmin?employeeID=${empID}`);

    if(response.success === true && response.data === "true"){
        return true;
    }

    return false;
}