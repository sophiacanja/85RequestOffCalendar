const express = require("express");
const calendarRequestsRouter = express.Router();
const CalendarRequestsModel =  require("../models/CalendarRequests.js");
// const bcrypt = require("bcrypt"); //! for salt and hashing

//! Calendar Requests API Calls
//createRequest, changeRequest, deleteRequest

calendarRequestsRouter.post("/createRequest", async (req, res) => { 
    //TODO: make smtp request 
    
    try {
        const dates = req.body.dates
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const empID = req.body.employeeID
        let message
        
        //handling edge cases: empty array, wrong format, already there
        if(dates.length === 0){ 
            message = "No date was entered"
        }
        if( await IncorrectDate(dates)){        //throws error if this is date entered 123-1-2023
            message = "Please check the format of your date request"
        }
        if( await DateAlreadyExists(dates)){
            message = "Date already requested"
        }
        if(dates.length === 0 || await IncorrectDate(dates) || await DateAlreadyExists(dates)){
            return res.status(400).send({
                success : false,
                message : message
            })
        }
        


        //create and save a new calendar request for each date 
        for(const date of dates){   
            const calendarRequest = new CalendarRequestsModel({
                employeeID: empID, 
                firstName: firstName,
                lastName: lastName,
                date: date
            })
            await calendarRequest.save(); 
        }

        //sends success message
        return res.status(200).send({
            success: true,
            message: "Requests successfully created"
           
        });

    } catch (err) {
        return res.status(500).send({ 
            error: err 
        });
    }
});


calendarRequestsRouter.delete("/deleteRequest", async (req, res) => { 
    //TODO: make smtp request 
    
    try {
        const date = new Date(req.query.date)
        const empID = req.query.empID;

        const deletedRequest = await CalendarRequestsModel.findOneAndDelete({employeeID: empID,  date: date});
        
        if(!deletedRequest){
            return res.status(400).send({
                success: false,
                message: "Request was not deleted"
            })
        }

        //sends success message
        return res.status(200).send({
            success: true,
            message: "Request successfully deleted"
        })

    } catch (err) {
        return res.status(500).send({ 
            error: err 
        });
    }
});



calendarRequestsRouter.get("/getAllRequestsForDate", async (req, res) => {  //invalid date, no date, multiple requests  
    const date = new Date(req.query.date)

    //check if invalid date or 


});



//helper function for createRequest that returns true if dates[] passed in has an incorrect format 
const IncorrectDate = async (dates) => {
    // regex format mm-dd-yyyy
    const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(\d{4})$/;
    for(const date of dates){

        //checks if correct format or date exists in database
        if(!dateRegex.test(date)){
            return true
        }
    }
    return false
};

//helper function for createRequest that returns true if dates[] passed in have already been requested
const DateAlreadyExists = async (dates) => {
    for (const date of dates) {
        //checks if date is already in the database
        const dateExistsForUser = await CalendarRequestsModel.findOne({ date: date })
        if(dateExistsForUser){
            return true
        }
    }
    return false
}







module.exports = {
    calendarRequestsRouter
};