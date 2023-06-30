import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import trashJSON from '../../assets/gifs/trash icon.json';
import Axios from 'axios';
import './DateCard.css';


const SavedDateCard = ({ date, formattedDate }) => {
  const animationContainerRef = useRef(null);
  const animationInstanceRef = useRef(null);
  const [deletionSuccessful, setDeletionSuccessful] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  useEffect(() => {
    const animationContainer = animationContainerRef.current;

    const anim = lottie.loadAnimation({
      container: animationContainer,
      animationData: trashJSON,
      loop: false,
      autoplay: false,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet', // Adjust the aspect ratio as needed
      },
    });

    animationInstanceRef.current = anim;

    return () => {
      anim.destroy(); // Clean up the animation when the component unmounts
    };
  }, []);


  // starts animation when mouse hovers over button
  const handleMouseEnter = () => {
    const anim = animationInstanceRef.current;
    if (anim) {
      anim.play();
    }
  };


  // sets gif to first frame when mouse leaves button
  const handleMouseLeave = () => {
    const anim = animationInstanceRef.current;
    if (anim) {
      anim.goToAndStop(0);
    }
  };

  //http://localhost:4000/calendar/deleteRequest?empID=<ID>&date=<date (mm/dd/yyyy)>
  const handleDeleteButtonClick = async () => {
    try {
      //TODO change empID for current user instead (currently is set for specific user)
      await Axios.delete(`http://localhost:4000/calendar/deleteRequest?empID=77&date=${formattedDate}`);
      setDeletionSuccessful(true);
      setErrorOccurred(false);
    } catch (err) {
      // console.log(err);
      setErrorOccurred(true);
      console.log('failed');
    }
  }


  if (deletionSuccessful && !errorOccurred) {
    return (
      <div className="card" style={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
        <span className="date">Successfully deleted request for: {date}</span>
      </div>
    )
  }

  if (!deletionSuccessful && errorOccurred) {
    return (
      <div className="card" style={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
        <span className="date">Error occurred for deleting request for date: {date}{date}</span>
      </div>
    )
  }


  return (
    <>
      <div className="card" style={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
        <span className="date">{date}</span>
        <button
          className="trash-button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleDeleteButtonClick}
        >
          <div ref={animationContainerRef} style={{ width: '30px', height: '30px' }}></div>
        </button>
      </div>
    </>
  );
};

export default SavedDateCard;
