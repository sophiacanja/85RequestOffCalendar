const express = require("express");
const usersRouter = express.Router();
const UserModel =  require("../models/Users.js");
const { useRef } = require("react");
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt"); //! for salt and hashing

/**
 * **************************************************** 
 * Login
 * @URL http://localhost:4000/users/login?empID=<ID>&pw=<password>
 * - empID: the employee ID
 * - password: password provided by user
 * 
 * @params_and_body
 * - query variables (mentioned in URL section)
 * - no body included
 * **************************************************** 
 */
// http://localhost:4000/users/login?empID=<ID>&pw=<password given>
usersRouter.get("/login", async(req, res) => {
    try {
        const ID = req.query.empID;  //req.query.empID "empID" must match key value on postman 
        const pw = req.query.pw;

        const {success, user} = await validateLogin(ID,pw)
        if(success){   //checks if user is invalid   
            return res.status(200).send({
                message: "successfully logged in!",
                data: user
            })

        }
        return res.status(400).send({
            message: "Invalid ID or password",
            data: null
        });


    } catch (err) {
        console.error(err)
        return res.status(500).send({ error: err });
    }
});

usersRouter.post("/token", async (req, res) => {
    try{
        const ID = req.body.empID
        const pw = req.body.pw
        //TODO store key as an environment var

        const {success, user} = await validateLogin(ID,pw)
        if(success) {
            const id = user.id
            const token = jwt.sign({ id }, "51c1fd9fa709c4c4bbbd6ef2d21c68e0ccb4090b3fb1f827b85bed56920778e9", {
                expiresIn: 300, //five minutes before token expires
            })
            return res.send({token})
    

        }

        return res.send({message: "invalid login credentials"})
        
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "Error occured" });
    }


})


/**
 * ****************************************************
 * Create User
 * @URL http://localhost:4000/users/createUser
 * 
 * @params_and_body
 * - no query variables
 * - body consists of the following: 
 *     {
 *       firstName: "string",
 *       lastName: "string",
 *       employeeID: 1234,
 *       email : "string",
 *       password : "string"
 *     }
 * **************************************************** 
 */
// http://localhost:4000/users/createUser
usersRouter.post("/createUser", async (req, res) => {

    try {
        const userInfo = req.body;
        const userExists = await UserModel.findOne({ employeeID: userInfo.employeeID });
        if(userExists){
            return res.status(400).send({
                success: false,
                message: "User already exists"
            }); 
        }

        // ensures inputs are valid formats
        const regexCheck = await RegexValidation(userInfo);
        if(!regexCheck.success){
            return res.status(400).send({
                success: false,
                message: regexCheck.message
            });
        }

        const newUser = new UserModel(userInfo);
        await newUser.save(); 
        return res.status(200).send({
            success: true,
            message: "User successfully created",
            data: newUser
        })

        } catch (err){
            return res.status(500).send({ 
                error: err 
            });
    }
});


/**
 * ****************************************************   
 * Update User Info
 * @URL http://localhost:4000/users/updateUser?employeeID=<ID>
 * - employee ID query variable
 * 
 * @params_and_body
 * - one query variable (employee ID)
 * - body consists of the following: 
 *     {
 *       firstName: "string",
 *       lastName: "string",
 *       employeeID: 1234,
 *       email : "string",
 *       password : "string"
 *     }
 * **************************************************** 
 */
// http://localhost:4000/users/updateUser?employeeID=<ID>
usersRouter.put("/updateUser", async (req, res) => {
/*
    body consists of the following:
    {
        firstName: "string",
        lastName: "string",
        email: "string",
        password: "string"
    }

*/
    try {
        const updatedUserInfo = req.body;
        const ID = req.query.employeeID   
        
        // ensures inputs are valid formats
        const regexCheck = await RegexValidation(updatedUserInfo);
        if(!regexCheck.success){
            return res.status(400).send({
                success: false,
                message: regexCheck.message
            });
        }

        const updateUser = await UserModel.findOneAndUpdate({employeeID: ID}, updatedUserInfo, {new:true})
      
        if(!updateUser){
            return res.status(400).send({
                success: false,
                message: "Update unsuccessful" 
            })
        }

        //update user is successful
        return res.status(200).send({
            success: true,
            message: "User successfully updated",
            data: updatedUserInfo
        })

    } catch (err){
        return res.status(500).send({ 
            error: err 
        });
    }
});

/**
 * **************************************************** 
 * Delete User
 * @URL http://localhost:4000/users/deleteUser?employeeID=<employee ID>
 * - employee ID query variable
 * 
 * @params_and_body
 * - one query variable (employee ID)
 * - no body needed
 * ****************************************************  
 */

// http:localhost:4000/users/deleteUser?employeeID=<ID>
usersRouter.delete("/deleteUser", async (req, res) => {
    try {
        const ID = req.query.employeeID
        const deletedUser = await UserModel.findOneAndDelete({employeeID: ID});

        if(!deletedUser){
                return res.status(400).send({
                success: false,
                message: "Unable to delete user"
            })
        }

        //delete user is successful
        return res.status(200).send({
            success: true,
            message: "User successfully deleted",
            data: deletedUser
        })

    } catch (err){
        return res.status(500).send({ 
            error: err 
        });
    }
});



/**
 * **************************************************** 
 * Checks if user is admin or not
 * @URL http://localhost:4000/users/userIsAdmin?employeeID=<emp ID>
 * - employee ID query variable
 * 
 * @params_and_body
 * - one query variable (employee ID)
 * - no body needed
 * ****************************************************  
 */
usersRouter.get("/userIsAdmin", async (req, res) => {
    try {
        const empID = req.query.employeeID;

        const adminStatus = await UserModel.findOne({employeeID: empID});
        if(!adminStatus){
            return res.status(400).send({
                success: false,
                message: "Not a valid employee ID"
            })
        }

        if(adminStatus.admin === "true"){
            return res.status(200).send({
                success: true,
                message: "Successfully found admin status",
                data: "true"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Successfully found admin status",
            data: "false"
        })
    } catch (err){
        return res.status(500).send({
            error: err
        });
    }
});

/**
 * Validates user information using regular expressions.
 *
 * @param {Object} userInfo - User information object containing the following properties:
 *   - firstName {string} - First name of the user.
 *   - lastName {string} - Last name of the user.
 *   - email {string} - Email address of the user.
 *   - password {string} - Password of the user.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object with the following properties:
 *   - success {boolean} - Indicates whether the validation was successful.
 *   - message {string} - Message describing the result of the validation.
 *
 * @example
 * const userInfo = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'Password123'
 * };
 *
 * const validation = await RegexValidation(userInfo);
 * console.log(validation.success); // true
 * console.log(validation.message); // "successful"
 */
const RegexValidation = async (userInfo) => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // contains at least one digit, one lowercase letter, one uppercase letter, one letter (lowercase or uppercase), and minimum of 8 characters

    if(userInfo.firstName.length <= 0 || !nameRegex.test(userInfo.firstName)){
        return {
            success: false,
            message: "invalid first name"
        };
    }

    if(userInfo.lastName.length <= 0 || !nameRegex.test(userInfo.lastName)){
        return {
            success: false,
            message: "invalid last name"
        };
    }

    if(userInfo.email.length <= 0 || !emailRegex.test(userInfo.email)){
        return {
            success: false,
            message: "invalid email"
        };
    }

    if(userInfo.password.length <= 0 || !passwordRegex.test(userInfo.password)){
        return {
            success: false,
            message: "invalid password, must contain at least one digit, one lowercase letter, one uppercase letter, and minimum length of 8 characters"
        };
    }

    return {
        success: true,
        message: "successful"
    };
};

/** 
 * Checks databse if employee ID is in database and if the password is correct 
 * @param 
 *  -empID {Number} - employee ID of user
 *  -password {String} - password entered by user
 * @returns {boolean} returns true if the inputted employee ID is found in the database with the correct password
 *  */ 
const validateLogin = async (empID, password)  => {
    try {
        const user = await UserModel.findOne({ employeeID: empID });  // request layout = {userSchema : queryID}
        if(!user || user.password !== password){
            // console.log("F")
            return {success: false, user: null}
        }
        // console.log("T")
        return {success: true, user}

    } catch (err) {
        throw new Error("Login validation failed");
    }
};

module.exports = {
    usersRouter
};