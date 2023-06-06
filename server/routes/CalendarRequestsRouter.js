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
        
        //edge case: empty array, wrong format, already there
        if(dates.length === 0 || await IncorrectDateOrAlreadyExists(dates)){
            return res.status(400).send({
                success : false,
                message : "Improper date(s) were requested"
            })
        }

        // let createdDates = [];
        //create a a new calendar request for each date 
        for(const date of dates){   
            const calendarRequest = new CalendarRequestsModel({
                employeeID: empID, 
                firstName: firstName,
                lastName: lastName,
                date: date
            })
            await calendarRequest.save(); 

            // createdDates.push(calendarRequest);
        }

        //sends success message
        return res.status(200).send({
            success: true,
            message: "Requests successfully created"
            // data: createdDates
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

        //request was successfully deleted
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
    const date = req.query.date


});



//helper function for createRequest
const IncorrectDateOrAlreadyExists = async (dates) => {
    // regex format mm-dd-yyyy
    const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(\d{4})$/;
    for(const date of dates){
        const dateExistsForUser = await CalendarRequestsModel.findOne({ date: date })

        if(!dateRegex.test(date) || dateExistsForUser){
            return true;
        }
    }
    return false;
};





module.exports = {
    calendarRequestsRouter
};