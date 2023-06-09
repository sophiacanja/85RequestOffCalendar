const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

app.use(cors({
    origin: "http://localhost:3000"
}));

const { usersRouter } = require("./routes/UsersRouter.js");
const { calendarRequestsRouter } = require("./routes/CalendarRequestsRouter.js");
const jwt = require('jsonwebtoken')

app.use(express.json());   
app.use('/users', usersRouter);
app.use('/calendar', calendarRequestsRouter);


mongoose.connect('mongodb://localhost:27017/85RequestOffCalendarDatabase').then(() => console.log("connected to 85RequestOffCalendar Database")).catch((err) => console.error(err));

app.listen(4000,'localhost', () => {
    console.log("server online!");
});