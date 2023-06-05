const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

app.use(cors({
    origin: "http://localhost:3000"
}));

// const { UsersRouter } = require("./routes/UsersRouter.js");
// const { CalendarRequestsRouter } = require("./routes/CalendarRequestsRouter.js");
// const { AdminRouter } = require("./routes/AdminRouter.js")

app.use(express.json());
// app.use('/users', UsersRouter);
// app.use('/calendar', CalendarRequestsRouter);
// app.use('/admin', AdminRouter);


mongoose.connect('mongodb://localhost:27017/85RequestOffCalendarDatabase').then(() => console.log("connected to 85RequestOffCalendar Database")).catch((err) => console.error(err));

app.listen(4000, () => {
    console.log("server online!");
});

