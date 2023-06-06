const express = require("express");
const usersRouter = express.Router();
const UserModel =  require("../models/Users.js");
// const bcrypt = require("bcrypt"); //! for salt and hashing

//! User API Calls

// http://localhost:4000/users/login?employeeID=<ID>&pw=<password given>
usersRouter.get("/login", async(req, res) => {
    try {
        const ID = req.query.empID;  //req.query.empID "empID" must match key value on postman 
        const pw = req.query.pw;

        const user = await UserModel.findOne({ employeeID: ID });  // request layout = {userSchema : queryID}
        if(!user || user.password != pw){
            return res.status(404).send({
                success: false,
                message: "invalid ID and/or password",
                data: null
            })
        }

        return res.status(200).send({
            success: true,
            message: "Successfully logged in!",
            data: user
        });

    } catch (err) {
        return res.status(500).send({ error: err });
    }
});

// http://localhost:4000/users/createUser?employeeID=<ID>
usersRouter.post("/createUser", async (req, res) => {
    try{
        const userInfo = req.body ;
        const userExists = await UserModel.findOne({ employeeID: userInfo.employeeID });
        if(userExists){
            return res.status(400).send({
                message: "User already exists" 
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

// http://localhost:4000/users/updateUser?employeeID=<ID>
usersRouter.put("/updateUser", async (req, res) => {
    try {
        const updatedUserInfo = req.body;
        const ID = req.query.employeeID    
        const updateUser = await UserModel.findOneAndUpdate({employeeID: ID}, updatedUserInfo, {new:true})
      
        if(!updateUser){S
            return res.status(400).send({
            success: false,
            message: "Update unsucessful" 
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

// http:localhost:4000/users/deleteUser?employeeID=<ID>
usersRouter.delete("/deleteUser", async (req,res) => {
    try {
        const userInfo = req.body
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
            message: "User successfully deleted"
        })

    } catch (err){
        return res.status(500).send({ 
            error: err 
        });
    }
});



module.exports = {
    usersRouter
};





