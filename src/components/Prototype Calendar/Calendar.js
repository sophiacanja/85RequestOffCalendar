import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePrevClick = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = prevDate.getMonth() - 1;
      return new Date(prevDate.getFullYear(), prevMonth, 1);
    });
  };

  const handleNextClick = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = prevDate.getMonth() + 1;
      return new Date(prevDate.getFullYear(), nextMonth, 1);
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    // Add blank cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`blank_${i}`} className="calendar-day"></div>);
    }

    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isCurrentMonth = month === currentDate.getMonth();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

      calendarDays.push(
        <div
          key={date.toISOString()}
          className={`calendar-day ${isCurrentMonth ? 'current-month' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>
      );
    }

    return <div className="calendar">{calendarDays}</div>;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button className="nav-button" onClick={handlePrevClick}>
          Prev
        </button>
        <h1>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
        <button className="nav-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
      {selectedDate && <p className="selected-date">Selected date: {selectedDate.toDateString()}</p>}
    </div>
  );
};

export default Calendar;
