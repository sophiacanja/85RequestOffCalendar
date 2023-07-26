import Button from "react-bootstrap/Button";
import backgroundBreadImage from "../assets/photos/breadBackground.webp"
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Logout.css'

const Logout = () => {

  const checkoutUser = async () => {
    localStorage.token = null; 
    window.location.reload();
  }

  return (
    <div style= {{ backgroundImage: `url(${backgroundBreadImage})`, backgroundRepeat: "no-repeat", 
      backgroundSize: "cover", height: '100vh', margin: 0, padding: 0}}>.

    <Container className="justify-content-center align-items-center text-center rounded" id="logout"> 
      <Col> 
        <Row> 
         <h1> Are you sure you want to log out? </h1>
        </Row> 

      <Button block="true" onClick={checkoutUser}> Logout </Button>
      </Col>
       
    </Container>

    </div> 
  );
};

export default Logout;
