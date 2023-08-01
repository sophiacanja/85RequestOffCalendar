import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Nav } from 'react-bootstrap';

const NavbarOption = ({ title, icon, pageRef }) => {
    const animationContainerRef = useRef(null);
    const animationInstanceRef = useRef(null);

    useEffect(() => {
        const animationContainer = animationContainerRef.current;

        const anim = lottie.loadAnimation({
            container: animationContainer,
            animationData: icon,
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
        // eslint-disable-next-line
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
        <Nav.Link href={pageRef} style={{ display: 'flex', alignItems: 'center', color: 'white', paddingRight: '20px' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div ref={animationContainerRef} style={{ height: '50px', marginRight: '5px' }}></div>
            {title}
        </Nav.Link>
    )

}

export default NavbarOption;