import Button from "react-bootstrap/Button";
import logoutBackground from "../assets/photos/logoutBackground.jpg"
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
    <div style={{
      backgroundImage: `url(${logoutBackground})`, backgroundRepeat: "no-repeat",
      backgroundSize: "cover", height: '90vh', margin: 0, padding: 0
    }}>.
      <Container className="rounded" id="logout">
        <Container className="justify-content-center align-items-center text-center  bg-white rounded">
          <Col>
            <Row>
              <h1> Are you sure you want to log out? </h1>
            </Row>

            <Button className="mb-4" block="true" onClick={checkoutUser}> Logout </Button>

          </Col>
        </Container>
      </Container>

    </div>
  );
};

export default Logout;
