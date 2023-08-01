import React from 'react';
import './Footer.css';

const Footer = ({ page }) => {

    /* DEPRECATED */
    /* if(page === "adminManagement"){
        return (
            <div className="footerAdminManagement" >
            <footer class="pb-3 my-4 bg-dark text-white">
              <Container className="footerContainer">
                <p style={{ textAlign: "center" }}>
                  This website manages the days off employees request for vacation. We appreciate your time!
                  <br></br> Developed by : Sophia Canja & Sovial Sonzeu
                </p>
              </Container>
            </footer>
          </div>
        )
    }
    */


    return (
        <footer class="footer">
            <p style={{ textAlign: "center" }}>
              This website manages the days off employees request for vacation. We appreciate your time!
              <br></br> Developed by : Sophia Canja & Sovial Sonzeu
            </p>
        </footer>
    )
}

export default Footer;