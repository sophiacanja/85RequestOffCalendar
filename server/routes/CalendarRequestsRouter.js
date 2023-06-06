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
        if( await DateAlreadyExists(dates,empID)){
            message = "One or more dates already requested"
        }
        if(message){
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
        try{ 
            const date = new Date(req.query.date)
            const checkDate = [req.query.date]
            let message;

            //check edge cases: no date given, invalid date 
            if(!req.query.date){
                message = "No date was entered"
            }
            if(await IncorrectDate(checkDate)){         //TODO: Fix error thrown by incorrectdate()
                message = "Please check the format of your date request"
            }
            if(message){
                return res.status(400).send({
                    success : false,
                    message : message
                })
            }

            // finds all requests made for the date 
            const requestsForDate = await CalendarRequestsModel.find({date: date})

            if(requestsForDate.length === 0) {
                return res.status(400).send({
                    success: false,
                    message: "There are no requests for that date"
                })
            }

            return res.status(200).send({
                success: true, 
                message: "Successfully returned all requests for given date"
            })


        } catch (err) {
            return res.status(500).send({ 
                error: err 
            });
        }

});



//helper function for createRequest that returns true if dates[] passed in has an incorrect format 
const IncorrectDate = async (dates) => {
    // regex format mm/dd/yyyy
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(\d{4})$/;
    for(const date of dates){

        //checks if correct format or date exists in database
        if(!dateRegex.test(date)){
            console.log(dateRegex)
            return true
        }
    }
    return false
};

//helper function for createRequest that returns true if dates[] passed in have already been requested by given employee
//!PENDINGDATES NEED TO BE PASSED IN "MM/DD/YYYY" due to comparison. Dates stored in database has "MM/DD/YYYY" format
const DateAlreadyExists = async (pendingDates,empID) => {
    //finds all requests made by the given employee ID
    const requestsForEmployee = await CalendarRequestsModel.find({ employeeID: empID })

    //goes through all requests in database and returns true if the pendingDate is already within database
    for (const request of requestsForEmployee) {
        for(const pendingDate of pendingDates){
            if(request.date === pendingDate){
                return true
            }
        }
    }
    return false
}







module.exports = {
    calendarRequestsRouter
};