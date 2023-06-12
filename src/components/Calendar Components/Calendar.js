import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import './Calendar.css';
import Axios from 'axios';

const Calendar = () => {
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  // const [datesRequestStatus, setDatesRequestedStatus] = useState(false); //TODO maybe use this for saying "Loading" when retrieving data...?
  const [savedDatesRequested, setSavedDatesRequested] = useState([]);

  const handleDateChange = (date) => {
    // setSelectedDate(date);
    const month = date.toString().slice(8, 11);
    let newDate = "";

    switch (month) {
      case "Jan":
        newDate = `January ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Feb":
        newDate = `February ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Mar":
        newDate = `March ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Apr":
        newDate = `April ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "May":
        newDate = `May ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Jun":
        newDate = `June ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Jul":
        newDate = `July ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Aug":
        newDate = `August ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Sep":
        newDate = `September ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Oct":
        newDate = `October ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Nov":
        newDate = `November ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
      case "Dec":
        newDate = `December ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        break;
    }

    setSelectedDates([newDate, ...selectedDates]);
  };

  useEffect(() => {
    const fetchAllDatesRequested = async () => {
      try {
        const response = await Axios.get(
          'http://localhost:4000/calendar/getAllRequestsForOneUser?employeeID=77'
        );
        const dates = response.data.data;
        // console.log(dates) //"2023-09-07" is the main part (at the beginning of each one)


        // using dates.map() function to return all the dates as strings per iteration
        const formattedDates = dates.map((date) => {
          const month = date.date.toString().slice(5, 7);
          let newDate = '';
          switch (month) {
            case '01':
              newDate = `January ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '02':
              newDate = `February ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '03':
              newDate = `March ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '04':
              newDate = `April ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '05':
              newDate = `May ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '06':
              newDate = `June ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '07':
              newDate = `July ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '08':
              newDate = `August ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '09':
              newDate = `September ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '10':
              newDate = `October ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '11':
              newDate = `November ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            case '12':
              newDate = `December ${date.date.toString().slice(8, 10)}, ${date.date.toString().slice(0, 4)}`;
              break;
            default:
              newDate = '';
          }
          return newDate;
        });

        setSavedDatesRequested(formattedDates);
      } catch (err) {
        console.log('Error fetching flavors: ', err);
      }
    };

    fetchAllDatesRequested();
    // console.log(savedDatesRequested);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container">
        <div className="sidebar" id="dates-requested">
          <h2>Dates Requested</h2>
          {/* //TODO make dateRequestCard that has trash can icon to remove */}
          {savedDatesRequested.map((date, index) => {
            return <p key={index}>{date}</p>
          })}
        </div>

        <div className="main" id="calendar-part">
          <DateCalendar disablePast={'false'} onChange={handleDateChange} />
        </div>

        <div className="sidebar" id="selected-dates">
          Selected Dates
          {/* another component with trash icon to remove */}
          <div>
            {selectedDates.map((date, index) => (
              <div key={index}>{date}</div>
            ))}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
