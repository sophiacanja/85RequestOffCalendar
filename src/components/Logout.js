import Button from "react-bootstrap/Button";
import image from "../assets/photos/85Bakery_bread.jpg"
import { Container } from "react-bootstrap";

const Logout = () => {

  const checkoutUser = async () => {
    localStorage.token = null; 
    window.location.reload();
  }

  return (
    <Container> 
      
       <div className="Logout verification"> Are you sure you want to log out?
         <Button block="true" onClick={checkoutUser}> Logout </Button>
      
       </div>
    </Container>
  );
};

export default Logout;
