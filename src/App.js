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
import UnknownPage from './components/UnknownPage';
import PrivateRouterUser from './components/PrivateRouterUser'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={false}>
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
              <Logout />
            </PrivateRouterUser>
          } />

          <Route path='/updateAccount' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={false}>
              <UpdateAccount />
            </PrivateRouterUser>
          } />

          <Route path='/adminHome' element={

            <PrivateRouterUser loginNecessary={true} adminNecessary={true}>
              <AdminHome />
            </PrivateRouterUser>
          } />

          <Route path='/adminManagement' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={true}>
              <AdminManagement />
            </PrivateRouterUser>
          } />

          {/* //TODO create own route component for forgot password */}

          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>
      <div class="footer" >
        <footer class="py-5 my-4 bg-dark text-white"> 
          <Container className= "footerContainer"> 
            <p style={{textAlign : "center"}}> 
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
