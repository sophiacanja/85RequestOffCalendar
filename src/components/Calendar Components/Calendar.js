import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './Calendar.css';
import Axios from 'axios';
import SelectedDateCard from './SelectedDateCard';

import SavedDateCard from './SavedDateCard';

const Calendar = () => {
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  // const [datesRequestStatus, setDatesRequestedStatus] = useState(false); //TODO maybe use this for saying "Loading" when retrieving data...?
  const [savedDatesRequested, setSavedDatesRequested] = useState([]);


  const handleDateChange = (date) => {
    const month = date.toString().slice(8, 11);
    // console.log(date.toString().slice(0,4));
    let presentableDate = "";
    let formattedDate = ""

    switch (month) {
      case "Jan":
        presentableDate = `January ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `01/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Feb":
        presentableDate = `February ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `02/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Mar":
        presentableDate = `March ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `03/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Apr":
        presentableDate = `April ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `04/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "May":
        presentableDate = `May ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `05/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Jun":
        presentableDate = `June ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `06/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Jul":
        presentableDate = `July ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `07/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Aug":
        presentableDate = `August ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `08/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Sep":
        presentableDate = `September ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `09/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Oct":
        presentableDate = `October ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `10/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Nov":
        presentableDate = `November ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `11/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      case "Dec":
        presentableDate = `December ${date.toString().slice(5, 7)}, ${date.toString().slice(12, 16)}`;
        formattedDate = `12/${date.toString().slice(5, 7)}/${date.toString().slice(12, 16)}`
        break;
      default:
        presentableDate = '';
        formattedDate = '';
        break;
    }

    if (presentableDate.length !== 0 && formattedDate.length !== 0) {
      setSelectedDates([[presentableDate, formattedDate, date], ...selectedDates]);
      // console.log('added date');
      // console.log(selectedDates);
    }
  };


  useEffect(() => {
    // fetching all dates requested stored in DB
    // TODO change to match the object id or emp id of logged in user
    const fetchAllDatesRequested = async () => {
      try {
        const response = await Axios.get(
          'http://localhost:4000/calendar/getAllRequestsForOneUser?employeeID=77'
        );
        const dates = response.data.data;
        // console.log(dates) //"YYYY-MM-DD" is the main part (at the beginning of each one)


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
          return [newDate, `${date.date.toString().slice(5, 7)}/${date.date.toString().slice(8, 10)}/${date.date.toString().slice(0, 4)}`];
        });
        console.log(formattedDates);
        setSavedDatesRequested(formattedDates);
      } catch (err) {
        console.log('Error fetching flavors: ', err);
      }
    };

    fetchAllDatesRequested();
    // console.log(savedDatesRequested);
  }, []);


  // disables all dates from the same week in MUI calendar (DateCalendar component)
  const shouldDisableDate = (date) => {
    // Get the current week's start and end dates
    const currentWeekStart = dayjs().startOf('week');
    const currentWeekEnd = dayjs().endOf('week');

    // Check if the date is within the current week
    return date.isAfter(currentWeekStart) && date.isBefore(currentWeekEnd);
  };


  // finds the date within selectedDates and removes it
  const handleDeleteSelectedDate = (date) => {
    // console.log(`${date[0]}\n${date[1]}\n${date[2]}`);
    setSelectedDates(selectedDates.filter((prevDate) => (
      prevDate[0] !== date[0] ||
      prevDate[1] !== date[1] ||
      prevDate[2] !== date[2]
    )));
  }


  
  const handleSubmitSelectedDates = () => {
    console.log("button clicked");
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container">
        <div className="section" id="dates-requested">
          <h1 style={{ textAlign: 'center' }}>Dates Requested</h1>
          {/* //TODO also add the prompt for when the backend does not work (probably should use useState to help with this) */}
          {/* ternary operator used in the case where the user does not have any requested days off */}
          {savedDatesRequested.length === 0 ? (
            <p style={{ textAlign: "center" }}>You do not have any requested days off</p>
          ) : (
            savedDatesRequested.map((date, index) => (
              <SavedDateCard key={index} date={date[0]} formattedDate={date[1]} />
            ))
          )}

        </div>
        {/* passes in shouldDisableDate functgion() into DateCalendar component for dynamic rendering of each date on the calendar; determines what should be enabled and disabled */}
        <div className="section" style={{ zoom: '1.4' }} id="calendar-part">
          <DateCalendar disablePast={'false'} onChange={handleDateChange} shouldDisableDate={shouldDisableDate} />
          <p style={{ textAlign: 'center' }}>Select the dates you would like to request off</p>
        </div>

        <div className="section" id="selected-dates">
          <h1 style={{ textAlign: 'center' }}>Selected Dates</h1>

          <div>
            {selectedDates.map((date, index) => (
              <SelectedDateCard key={index} presentableDate={date[0]} formattedDate={date[1]} rawDate={date[2]} deleteCard={handleDeleteSelectedDate} />
            ))}
          </div>
          <button className="submit-button" onClick={handleSubmitSelectedDates}>
            Submit
          </button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
