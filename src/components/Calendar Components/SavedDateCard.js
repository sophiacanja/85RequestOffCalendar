import React, { useEffect, useRef } from 'react';
import './SavedDateCard.css';
import lottie from 'lottie-web';
import trashJSON from '../../assets/gifs/trash icon.json';

const SavedDateCard = ({ date }) => {
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

  return (
    <>
      <div className="card" style={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
        <span className="date">{date}</span>
        <button
          className="trash-button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={animationContainerRef} style={{ width: '30px', height: '30px' }}></div>
        </button>
      </div>
    </>
  );
};

export default SavedDateCard;
