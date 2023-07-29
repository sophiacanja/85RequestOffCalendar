import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';

// components for pages
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from "./components/Login";
import Logout from './components/Logout';
import UpdateAccount from './components/UpdateAccount';
import AdminHome from './components/Admin/AdminHome';
import AdminManagement from './components/Admin/AdminManagementComponents/AdminManagement';
import ForgotPassword from './components/ForgotPassword';
import UnknownPage from './components/UnknownPage';
import PrivateRouterUser from './components/PrivateRouterUser'
import ResetPassword from './components/ResetPassword';
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path='/' exact element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={false}>
              <Navbar />
              <Home />
            </PrivateRouterUser>
          } />
          <Route path="/login" element={
            <PrivateRouterUser loginNecessary={false} adminNecessary={false}>
              <Login />
            </PrivateRouterUser>
          } />


          <Route path='/logout' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={false}>
              <Navbar />
              <Logout />
            </PrivateRouterUser>
          } />

          <Route path='/updateAccount' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={false}>
              <Navbar />
              <UpdateAccount />
            </PrivateRouterUser>
          } />

          <Route path='/adminHome' element={

            <PrivateRouterUser loginNecessary={true} adminNecessary={true}>
              <Navbar />
              <AdminHome />
            </PrivateRouterUser>
          } />

          <Route path='/adminManagement' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={true}>
              <Navbar />
              <AdminManagement />
            </PrivateRouterUser>
          } />

          <Route path='/forgotPassword' element={
            <PrivateRouterUser loginNecessary={false} adminNecessary={false}>
              <ForgotPassword />
            </PrivateRouterUser>
          } />

          <Route path='/resetPassword' element={
            <PrivateRouterUser loginNecessary={false} adminNecessary={false}>
              <ResetPassword />
            </PrivateRouterUser>
          } />



          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>


      <div class="footer" >
        <footer class="py-5 my-4 bg-dark text-white">
          <Container className="footerContainer">
            <p style={{ textAlign: "center" }}>
              This website manages the days off employees request for vacation. We appreciate your time!
              <br></br> Developed by : Sophia Canja & Sovial Sonzeu
            </p>
          </Container>
        </footer>
      </div>



    </>
  );
}

export default App;
