import React, { useEffect, useRef } from 'react';
import '../../Calendar Components/CSS/DateCard.css';
import lottie from 'lottie-web';
import trashJSON from '../../../assets/gifs/trash icon.json';

const SelectedDateCard = ({ presentableDate, formattedDate, rawDate, deleteCard }) => {
  const animationContainerRef = useRef(null);
  const animationInstanceRef = useRef(null);

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

  
  // deletes card using passed in prop function
  const handleDeleteButtonClick = () => {
    deleteCard([presentableDate, formattedDate, rawDate]);
  }


  return (
    <>
      <div className="card">
        <span className="date">{presentableDate}</span>
        <button
          className="trash-button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleDeleteButtonClick}
        >
          <div ref={animationContainerRef} style={{ height: '30px' }}></div>
        </button>
      </div>
    </>
  )
}

export default SelectedDateCard;