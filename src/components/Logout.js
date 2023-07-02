import Button from "react-bootstrap/Button";

const Logout = () => {

  const checkoutUser = async () => {
    localStorage.token = null; 
    window.location.reload();
  }

  return (
    <div className="Logout verification"> Are you sure you want to log out?
      <Button block="true" onClick={checkoutUser}> Logout </Button>
    </div>
  );
};

export default Logout;
