const mongoose = require("mongoose");

const CalendarRequestsSchema = new mongoose.Schema({
    employeeID: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: {
        type: Date,
        required: true,
        get: (value) => value.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }), // 05-12-2023
    }
});


// Modify the 'date' field to store only the date
// CalendarRequestsSchema.path('date').get(function(value) {
//     return value.toISOString().split('T')[0];
// });

const CalendarRequestsModel = mongoose.model("calendarRequests", CalendarRequestsSchema);

module.exports = CalendarRequestsModel; 