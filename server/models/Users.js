/* this file outlines the information that is stored in the db, this is referenced when making api calls to db*/
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    employeeID: { type: Number, required: true },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        unique: true
      },
    password: { type: String, required: true },
    admin: { type: String, required: true, default: "false" }

});

const UserModel = mongoose.model("users", UserSchema); // name of collection, name of model/schema

module.exports = UserModel;