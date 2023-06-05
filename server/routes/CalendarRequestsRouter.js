const express = require("express");
const usersRouter = express.Router();
const UserModel =  require("../models/CalendarRequests.js");
// const bcrypt = require("bcrypt"); //! for salt and hashing