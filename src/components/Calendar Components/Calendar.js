import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './Calendar.css';
import Axios from 'axios';
import SelectedDateCard from './SelectedDateCard';

import SavedDateCard from './SavedDateCard';

import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';



const Calendar = () => {
  const [submitStatus, setSubmitStatus] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [loadedAllSavedDates, setLoadedAllSavedDates] = useState(false);
  // const [datesRequestStatus, setDatesRequestedStatus] = useState(false); //TODO maybe use this for saying "Loading" when retrieving data...?
  const [savedDatesRequested, setSavedDatesRequested] = useState([]);
  const [currentlySubmittingDates, setCurrentlySubmittingDates] = useState(false);

  useEffect(() => {
    // fetching all dates requested stored in DB
    // TODO change to match the object id or emp id of logged in user
    const fetchAllDatesRequested = async () => {
      try {
        const response = await Axios.get(
          'http://localhost:4000/calendar/getAllUpcomingRequestsForOneUser?employeeID=77'
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
          // presentableDate, formattedDate, rawDate
          return [newDate, `${date.date.toString().slice(5, 7)}/${date.date.toString().slice(8, 10)}/${date.date.toString().slice(0, 4)}`, date];
        });
        // console.log(formattedDates);
        setSavedDatesRequested(formattedDates);
        setLoadedAllSavedDates(true);
      } catch (err) {
        console.log('Error fetching flavors: ', err);
      }
    };

    fetchAllDatesRequested();
    // console.log(savedDatesRequested);
  }, []);


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


  // disables all dates from the same week in MUI calendar (DateCalendar component)
  const shouldDisableDate = (date) => {
    if (!loadedAllSavedDates) { // start with calendar disabled to prevent any bugs when choosing dates
      return true;
    }

    // Get the current week's start and end dates
    const currentWeekStart = dayjs().startOf('week');
    const currentWeekEnd = dayjs().endOf('week');

    // Filter the arrays and check if the date is within the current week or matches a previous date
    const filteredSelectedDates = selectedDates.filter((selectedDate) => selectedDate[2]);
    const filteredSavedDatesRequested = savedDatesRequested.filter((savedDate) => {
      const formattedDate = savedDate[1]; // MM/DD/YYYY
      const [month, day, year] = formattedDate.split('/').map(Number);
      const dateObj = new Date(year, month - 1, day); // Subtract 1 from the month since it is zero-based in JavaScript Date

      return dateObj.toDateString() === date.toDate().toDateString();
    });

    return (
      (date.isAfter(currentWeekStart) && date.isBefore(currentWeekEnd)) ||
      filteredSelectedDates.some((prevDate) => date.isSame(prevDate[2], 'day')) ||
      filteredSavedDatesRequested.length > 0
    );
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


  // for submitting all selected dates to MongoDB database
  const handleSubmitSelectedDates = async () => {
    try {
      setCurrentlySubmittingDates(true);
      const body = {
        firstName: "Sovi",
        lastName: "Sonz",
        employeeID: 77,
        dates: selectedDates.map((date) => date[1])
      }
      console.log(body);

      await Axios.post(`http://localhost:4000/calendar/createRequest`, body);

      setSubmitStatus("Successful! Reloading page...");

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      // console.log(err);
      setSubmitStatus(err);
      setCurrentlySubmittingDates(false);
      console.log("oops");
    }
  }


  // used for changing backgroundColor of specific dates
  const CustomPickersDay = styled(PickersDay)(() => ({
  }));

  const Day = (props) => {
    const { day, selectedDay, ...other } = props;
    const formattedDay = day.format(`MM/DD/YYYY`);

    const inSavedDatesRequested = savedDatesRequested.some((date) => date[1] === formattedDay);
    const inSelectedDates = selectedDates.some((date) => date[1] === formattedDay);

    // render current selected date to green (IN THEORY...)
    if (formattedDay === selectedDay?.format('MM/DD/YYYY')) {
      return (
        <CustomPickersDay
          day={day}
          {...other}
          sx={{
            backgroundColor: 'green',
            color: 'white',
          }}
        />
      );
    }
    
    // if ordinary day (not requested nor selected), then render regular
    if (!inSavedDatesRequested && !inSelectedDates) {
      return <CustomPickersDay day={day} {...other} />;
    }

    // Render it red
    if (inSavedDatesRequested) {
      return (
        <CustomPickersDay
          day={day}
          {...other}
          sx={{
            backgroundColor: 'rgb(252, 150, 152)',
            color: 'red',
          }}
        />
      );
    }

    // Render it yellow
    if (inSelectedDates) {
      return (
        <CustomPickersDay
          day={day}
          {...other}
          sx={{
            backgroundColor: 'yellow',
            color: 'red',
          }}
        />
      );
    }
  };





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
        <div className="section" style={{ zoom: '1.4' }} id="calendar-part">
          <DateCalendar
            disablePast={true}
            onChange={handleDateChange}
            shouldDisableDate={shouldDisableDate}
            slots={{ day: Day }}
          />
          <p style={{ textAlign: 'center' }}>Select the dates you would like to request off</p>

        </div>

        <div className="section" id="selected-dates">
          <h1 style={{ textAlign: 'center' }}>Selected Dates</h1>

          <div>
            {selectedDates.map((date, index) => (
              <SelectedDateCard key={index} presentableDate={date[0]} formattedDate={date[1]} rawDate={date[2]} deleteCard={handleDeleteSelectedDate} />
            ))}
          </div>
          <button className="submit-button" onClick={handleSubmitSelectedDates} disabled={selectedDates.length === 0 || currentlySubmittingDates === true}>
            Submit
          </button>
          <p style={{ textAlign: "center" }}>{submitStatus}</p>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;