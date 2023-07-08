const express = require("express");
const usersRouter = express.Router();
const UserModel =  require("../models/Users.js");
const { useRef } = require("react");
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt"); //! for salt and hashing


/** 
 * **************************************************** 
 * isUserAuth: Verifies the user's JWT, this is needed for all api requests that access sensitive info
 * @URL http://localhost:4000/users/isUserAuth
 * 
 * @params_and_body
 * - query variable: "x-access-token"
 * 
 * **************************************************** 
 */

usersRouter.get("/isUserAuth", async (req, res) => {
    try{
        const token = req.headers["x-access-token"]
        let objID = null
        //checks if token is passed in
        if(!token){
            return res.json({auth: false, message: "We need a token"})
        } else{
            //decodes token using the secret key 
            const decoded = await jwt.verify(token, "51c1fd9fa709c4c4bbbd6ef2d21c68e0ccb4090b3fb1f827b85bed56920778e9") 
            //if token is valid, it stores the obj id
            objID = decoded.id 
            const user = await UserModel.findById(objID)
            return res.json({auth: true, message: "CONGRATS", admin: user.admin, user: user})
        }
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            // Token has expired
            return res.send({auth: false, message: "Token expired"})

          } else if (err instanceof jwt.JsonWebTokenError) {
            // Invalid token or signature
            return res.send({auth: false, message: "Invalid token"})

          } else {
            // Other verification error
            return res.status(500).send({error: err})
          }
    }
})

/**
 * ****************************************************
 * LoginAndCreateToken: Verifies username and password and generate a jwt token
 * @URL http://localhost:4000/users/token
 * 
 * @params_and_body
 * - no query variables
 * - body consists of the following: 
 * {
 *      "employeeID" : 1234
 *      "password"  : "string"
 * }
 * **************************************************** 
 */
usersRouter.post("/loginAndCreateToken", async (req, res) => {
    try{
        const ID = req.body.employeeID
        const pw = req.body.password
        const {success, user} = await validateLogin(ID,pw)
        
        //if credentials are valid 
        if(success) {
            const id = user.id
            //creates jwt using user.id and the secret key
            const token = await jwt.sign({ id }, "51c1fd9fa709c4c4bbbd6ef2d21c68e0ccb4090b3fb1f827b85bed56920778e9", {
                expiresIn: 600, //ten minutes before token expires
            })
            //return user information
            return res.json({auth: true,  token: token, user: user, admin: user.admin})

        } else {
            //return error message if employeeID and password are invalid
            return res.json({auth: false, message: "invalid login credentials"})
        }

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "Error occured" });
    }
})


/**
 * ****************************************************
 * createUser: Creates a new entry within the database
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
 * updateUser: Updates the infromation in the database of the given employeeID 
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
usersRouter.put("/updateUser", async (req, res) => {
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
 * Delete User: Deletes the entry in the database with the given employeeID
 * @URL http://localhost:4000/users/deleteUser?employeeID=<employee ID>
 * - employee ID query variable
 * 
 * @params_and_body
 * - one query variable (employee ID)
 * - no body needed
 * ****************************************************  
 */
usersRouter.delete("/deleteUser", async (req, res) => {
    try {
        const employeeID = req.query.employeeID
        const deletedUser = await UserModel.findOneAndDelete({employeeID: employeeID});

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
 * userIsAdmin: Checks if user is admin or not
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
 * **************************************************** 
 * getAllUsers: Returns the first name, last name, employee ID, and email of all users in database
 * @URL http://localhost:4000/users/getAllUsers
 * 
 * @params_and_body
 * - no body needed
 * ****************************************************  
 */
usersRouter.get("/getAllUsers", async (req, res) => {
    try{
        //accesses all the information from users database
        const userInfo = await UserModel.find({}, 'firstName lastName email employeeID'); 

        //if database is empty then return error message
        if(userInfo.length === 0){
            return res.status(400).send({
                success: false,
                message: "Employee database is empty, no users found",
                data: null
            })
        }
        else{
            //returns: firstName, lastName, employeeID, email, password, admin status of all users 
            return res.status(200).send({
                    success: true,
                    message: "Successfully returned all user info",
                    data: userInfo
                });
            }

    }catch (err) {
        return res.status(500).send({
            error: err
        });
    }
});



/**
 * RegexValidation: Validates user information using regular expressions.
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
 * validateLogin: Checks databse if employee ID is in database and if the password is correct 
 * @param 
 *  -empID {Number} - employee ID of user
 *  -password {String} - password entered by user
 * @returns {boolean} returns true if the inputted employee ID is found in the database with the correct password
 *  */ 
const validateLogin = async (empID, password)  => {
    try {
        //find specific employee in database using employeeID
        const user = await UserModel.findOne({ employeeID: empID });  // request layout = {userSchema : queryID}
        //checks if database has the user and its correct password
        if(!user || user.password !== password){
            return {success: false, user: null}
        }
        else{
            //return true if user is valid
            return {success: true, user: user}
        }  

    } catch (err) {
        return res.status(500).send({message:"INVALID LOGIN"})
    }
};



module.exports = {
    usersRouter
};