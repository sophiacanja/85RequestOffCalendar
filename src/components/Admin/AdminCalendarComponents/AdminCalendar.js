import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Axios from 'axios';
import SelectedDateCard from '../../Calendar Components/SelectedDateCard';
import adminBackground from "../../../assets/photos/adminBackground.jpg"
import SavedDateCard from '../../Calendar Components/SavedDateCard';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import EmployeeCard from './EmployeeCard';
import { Container } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

import '../../Calendar Components/CSS/MainPage.css'


const AdminCalendar = () => {
  const [submitStatus, setSubmitStatus] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [loadedAllSavedDates, setLoadedAllSavedDates] = useState(false);
  // const [datesRequestStatus, setDatesRequestedStatus] = useState(false); //TODO maybe use this for saying "Loading" when retrieving data...?
  const [savedDatesRequested, setSavedDatesRequested] = useState([]);
  const [currentlySubmittingDates, setCurrentlySubmittingDates] = useState(false);

  const [currentMode, setCurrentMode] = useState(1); // 1 means admin mode, 0 means regular user mode
  const [employeesRequestedOff, setEmployeesRequestedOff] = useState([]);
  const [presentableDate, setPresentableDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [fetchStatus, setFetchStatus] = useState(false);

  useEffect(() => {
    // fetching all dates requested stored in DB
    // TODO change to match the object id or emp id of logged in user
    const fetchAllDatesRequested = async () => {
      try {
        const isAuth = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } });

        if (isAuth.data.auth === false) { // if user is not authenticated or JWT is expired, no need to do more API calls
          return
        }

        const userEmployeeID = isAuth.data.user.employeeID;

        const response = await Axios.get(
          `http://localhost:4000/calendar/getAllUpcomingRequestsForOneUser?employeeID=${userEmployeeID}`
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


  const adminHandleDateChange = async (date) => {
    const month = date.toString().slice(8, 11);

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

    setPresentableDate(presentableDate);
    setFormattedDate(formattedDate);

    setFetchStatus("Loading");

    try {
      const response = (await Axios.get(`http://localhost:4000/calendar/getAllRequestsForDate?date=${formattedDate}`)).data.data;
      setEmployeesRequestedOff(response);
      setFetchStatus("Done");
      console.log(response);
    } catch (err) {
      setFetchStatus("Error");

    }
  }

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
      //checks if user is authorized and validates the jwt 
      const response = await Axios.get("http://localhost:4000/users/isUserAuth", { headers: { "x-access-token": localStorage.getItem("token") } })
      // console.log(response)

      //if jwt is expired, reload page
      if (response.data.auth === false) {
        window.location.reload()
      } else {
        //if user is authorized, save user info and submit request by calling createRequest api  
        const body = {
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          employeeID: response.data.user.employeeID,
          dates: selectedDates.map((date) => date[1])
        }
        await Axios.post(`http://localhost:4000/calendar/createRequest`, body);
        setSubmitStatus("Successful! Reloading page...");
      }

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

  const handleModeChange = () => {
    setCurrentMode((currentMode + 1) % 2);
    setSelectedDates([]);
    setEmployeesRequestedOff([]);
    setPresentableDate("");
    setFormattedDate("");
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
    if ((!inSavedDatesRequested && !inSelectedDates) || (currentMode === 1)) {
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
    <div style={{
      backgroundImage: `url(${adminBackground})`, backgroundRepeat: "no-repeat",
      backgroundSize: "cover", height: '90vh', margin: 0, padding: 0
    }}>.
      <Container className="AdminHomeContainer">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="SectionsInThirds">
              <h2 id="dates-requested" style={{ textAlign: 'center' }}>Dates Requested</h2>
              <div className="ScrollableContainer">

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
            </div>
            <div className="calendarSection" style={{ zoom: '1.4' }} id="calendar-part">
              <DateCalendar
                disablePast={currentMode === 0 ? true : false}
                onChange={currentMode === 0 ? handleDateChange : adminHandleDateChange}
                shouldDisableDate={currentMode === 0 ? shouldDisableDate : false}
                slots={{ day: Day }}
              />
              <button
                style={{
                  display: 'block',
                  margin: '0 auto',
                  backgroundColor: currentMode === 1 ? '#007bff' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 20px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                onClick={handleModeChange}
              >
                Currently in {currentMode === 1 ? "Admin Mode" : "User Mode"}
              </button>
            </div>

            <div className="SectionsInThirds">
              <h2 id="unavailable-employees" style={{ textAlign: 'center' }}>{currentMode === 1 ? "Unavailable Employees" : "Selected Dates"}</h2>
                <div className="ScrollableContainer">
                  <div>
                    {(() => {
                      if (currentMode === 0) {// eslint-disable-next-line
                        {/* user mode */ }
                        return (
                          <>
                            {selectedDates.map((date, index) => (
                              <SelectedDateCard key={index} presentableDate={date[0]} formattedDate={date[1]} rawDate={date[2]} deleteCard={handleDeleteSelectedDate} />
                            ))}
                          </>
                        )
                      } else { // eslint-disable-next-line
                        {/* admin mode */ }
                        if (fetchStatus === "Loading") {
                          return (
                            <>
                              <img src={require('../../../assets/gifs/loading.gif')} style={{ display: 'block', margin: '0 auto', width: '25%' }} alt="Loading gif" />
                            </>
                          )
                        }

                        if (fetchStatus === "Error") {
                          return (
                            <>
                              <img src={require('../../../assets/gifs/wrench.gif')} style={{ display: 'block', margin: '0 auto', width: '25%' }} alt="Loading gif" />
                              <p style={{ textAlign: 'center' }}>There was an error when retrieving data, please try again or contact IT.</p>
                            </>
                          )
                        }
                        if (formattedDate.length === 0 || presentableDate === 0) {
                          return (
                            <>
                              <p style={{ textAlign: 'center' }}>Start by selecting a date on the calendar</p>
                            </>
                          )
                        }
                        if (employeesRequestedOff.length === 0) {
                          return (
                            <>
                              <p style={{ textAlign: 'center' }}>No requests off for date:</p>
                              <p style={{ textAlign: 'center' }}>{presentableDate}</p>
                            </>
                          )
                        } else {
                          return (
                            <>
                              {employeesRequestedOff.map((entry, index) => (
                                <EmployeeCard firstName={entry.firstName} lastName={entry.lastName} employeeID={entry.employeeID} />
                              ))}
                            </>
                          )
                        }
                      }
                    })()}
                  </div>
                  {currentMode === 0 && <Button className="submit-button" onClick={handleSubmitSelectedDates} disabled={selectedDates.length === 0 || currentlySubmittingDates === true}>
                    Submit
                  </Button>}
                  <p style={{ textAlign: "center" }}>{submitStatus}</p>
                </div>
            </div>
        </LocalizationProvider>
      </Container >
    </div >

  );
};

export default AdminCalendar;