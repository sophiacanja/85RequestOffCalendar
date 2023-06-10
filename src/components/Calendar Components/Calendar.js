import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDates([date, ...selectedDates]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container">
        <div className="sidebar" id="dates-requested">
          Dates Requested
        </div>
        <div className="main" id="calendar-part">
          <DateCalendar disablePast={'false'} onChange={handleDateChange} />
          <div>
            Selected Date: {selectedDate ? selectedDate.toString() : 'None'}
          </div>
        </div>
        <div className="sidebar" id="selected-dates">
          Selected Dates
          {/* another component with trash icon to remove */}
          <div>
            {selectedDates.map((date, index) => (
              <div key={index}>{date.toString()}</div>
            ))}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
