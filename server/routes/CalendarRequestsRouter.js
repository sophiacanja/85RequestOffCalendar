const express = require("express");
const calendarRequestsRouter = express.Router();
const CalendarRequestsModel = require("../models/CalendarRequests.js");
// const bcrypt = require("bcrypt"); //! for salt and hashing

//! Calendar Requests API Calls

/**
 * ***************************************************
 * Create Calendar Request(s)
 * @URL http://localhost:4000/calendar/createRequest
 * 
 * @params_and_body
 * - no query variables
 * - body consists of the following:
 * {
 *      firstName: "string",
 *      lastName: "string",
 *      empID: 123,
 *      dates: ["MM/DD/YYYY", "MM/DD/YYYY", ...]
 * }
 * **************************************************** 
 */

// http://localhost:4000/calendar/createRequest
calendarRequestsRouter.post("/createRequest", async (req, res) => {
    //TODO: make smtp request - sends update noti to admin(s)
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const empID = req.body.employeeID
        const dates = req.body.dates

        let message = "";

        //handling edge cases: empty array, wrong format, already there
        if (dates.length === 0) {
            message = "No date was entered"
        }
        if (await IncorrectDate(dates)) {        //throws error if this is date entered 123-1-2023
            message = "Please check the format of your date request"
        }
        if (await DateAlreadyExists(dates, empID)) {
            message = "One or more dates already requested"
        }
        if (message.length > 0) {
            return res.status(400).send({
                success: false,
                message: message
            })
        }


        //create and save a new calendar request for each date 
        for (const date of dates) {
            const calendarRequest = new CalendarRequestsModel({
                firstName: firstName,
                lastName: lastName,
                employeeID: empID,
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


/**
 * ****************************************************
 * Delete Calendar Request(s)
 * @URL http://localhost:4000/calendar/deleteRequest?date=<date (MM/DD/YYYY)>
 * - date query variable definition should follow format MM/DD/YYYY
 * 
 * @params_and_body
 * - date query variable (as mentioned in URL section)
 * - no body needed
 * ****************************************************
 */

// http://localhost:4000/calendar/deleteRequest?empID=<ID>&date=<date (mm/dd/yyyy)>
calendarRequestsRouter.delete("/deleteRequest", async (req, res) => {
    //TODO: make smtp request (don't necessarily need????)

    try {
        const date = new Date(req.query.date)
        const empID = req.query.empID;

        const deletedRequest = await CalendarRequestsModel.findOneAndDelete({ employeeID: empID, date: date });

        if (!deletedRequest) {
            return res.status(400).send({
                success: false,
                message: "Request was not deleted"
            })
        }

        //sends success message
        return res.status(200).send({
            success: true,
            message: "Request successfully deleted",
            data: deletedRequest
        })

    } catch (err) {
        return res.status(500).send({
            error: err
        });
    }
});


/** *************************************************** 
* Get all requests for specific date
* @URL http://localhost:4000/calendar/getAllRequestsForDate?date=<date (mm/dd/yyyy)>
* - date query variable definition should follow format MM/DD/YYYY
* 
* @params_and_body
* - date query variable (as mentioned in URL section)
* - no body needed
* ***************************************************
*/
//http://localhost:4000/calendar/getAllRequestsForDate?date=<date (mm/dd/yyyy)>
calendarRequestsRouter.get("/getAllRequestsForDate", async (req, res) => {  //invalid date, no date, multiple requests 
    try {
        const date = new Date(req.query.date)
        const checkDate = [req.query.date]
        let message;

        //check edge cases: no date given, invalid date 
        if (!req.query.date) {
            message = "No date was entered"
        }
        if (await IncorrectDate(checkDate)) {
            message = "Please check the format of your date request"
        }
        if (message) {
            return res.status(400).send({
                success: false,
                message: message
            })
        }

        // finds all requests made for the date 
        const requestsForDate = await CalendarRequestsModel.find({ date: date })

        if (requestsForDate.length === 0) {
            return res.status(200).send({
                success: true,
                message: "There are no requests for that date",
                data: []
            })
        }

        return res.status(200).send({
            success: true,
            message: "Successfully returned all requests for given date",
            data: requestsForDate
        })


    } catch (err) {
        return res.status(500).send({
            error: err
        });
    }

});




/**
 * **************************************************** 
 * Get all request(s) for specific user
 * @URL http://localhost:4000/calendar/getAllRequestsForOneUser?employeeID=<empID>
 * -employee ID query variable 
 * 
 * @params_and_body
 * - employee ID query variable (mentioned above)
 * - no body needed
 * ****************************************************
 */
//http://localhost:4000/calendar/getAllRequestsForOneUser?employeeID=<empID>
calendarRequestsRouter.get("/getAllRequestsForOneUser", async (req, res) => {
    try {
        const empID = req.query.employeeID

        //error check if empID is valid
        if (!empID) {
            return res.status(400).send({
                success: false,
                message: "Invalid employee ID",
                data: null
            })
        }

        //finds all requests made by given employee ID
        const userRequests = await CalendarRequestsModel.find({ employeeID: empID })

        return res.status(200).send({
            success: true,
            message: "Successfully retreived all requests",
            data: userRequests
        })


    } catch (err) {
        return res.status(500).send({
            error: err
        });
    }
});

/**
 * **************************************************** 
 * Get all request(s) for specific user that are upcoming (no past requests)
 * @URL http://localhost:4000/calendar/getAllUpcomingRequestsForOneUser?employeeID=<empID>
 * -employee ID query variable 
 * 
 * @params_and_body
 * - employee ID query variable (mentioned above)
 * - no body needed
 * ****************************************************
 */
calendarRequestsRouter.get("/getAllUpcomingRequestsForOneUser", async (req, res) => {
    try {
        const empID = req.query.employeeID;

        // Error check if empID is valid
        if (!empID) {
            return res.status(400).send({
                success: false,
                message: "Invalid employee ID",
                data: null
            });
        }

        const currentDate = new Date();

        // Calculate the start of the next week
        const startOfNextWeek = new Date();
        startOfNextWeek.setDate(currentDate.getDate() + (7 - currentDate.getDay()) + 1); // (month date + (number of days till the next week starts))
        startOfNextWeek.setHours(0, 0, 0, 0);

        // Retrieve all requests made by the given employee ID that have dates in the future and are the earliest start of the next week. Also sorts them after retrieval
        const userRequests = await CalendarRequestsModel.find({
            employeeID: empID,
            date: { $gte: startOfNextWeek } // "greater than or equal to" operator
        }).sort({ date: 1 }); // sorts after retrieval

        return res.status(200).send({
            success: true,
            message: "Successfully retrieved all upcoming requests",
            data: userRequests
        });
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
    for (const date of dates) {

        //checks if correct format or date exists in database
        if (!dateRegex.test(date)) {
            return true;
        }
    }
    return false;
};

//helper function for createRequest that returns true if dates[] passed in have already been requested by given employee
//!PENDINGDATES NEED TO BE PASSED IN "MM/DD/YYYY" due to comparison. Dates stored in database has "MM/DD/YYYY" format
const DateAlreadyExists = async (pendingDates, empID) => {
    //finds all requests made by the given employee ID
    const requestsForEmployee = await CalendarRequestsModel.find({ employeeID: empID })

    //goes through all requests in database and returns true if the pendingDate is already within database
    for (const request of requestsForEmployee) {
        for (const pendingDate of pendingDates) {
            if (request.date === pendingDate) {
                return true;
            }
        }
    }
    return false;
}


module.exports = {
    calendarRequestsRouter
};