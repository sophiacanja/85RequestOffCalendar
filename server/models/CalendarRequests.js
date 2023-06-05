const mongoose = require("mongoose");

const CalendarRequestsSchema = new mongoose.Schema({
    customerID: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: {
        type: Date,
        required: true,
        get: (value) => value.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    }
});

const CalendarRequestsModel = mongoose.model("calendarRequests", CalendarRequestsSchema);

module.exports = UserModel; 