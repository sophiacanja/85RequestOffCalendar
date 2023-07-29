import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

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
import Footer from './components/Footer';
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
              <Footer />
            </PrivateRouterUser>
          } />
          <Route path="/login" element={
            <PrivateRouterUser loginNecessary={false} adminNecessary={false}>
              <Login />
              <Footer />
            </PrivateRouterUser>
          } />


          <Route path='/logout' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={false}>
              <Navbar />
              <Logout />
              <Footer />
            </PrivateRouterUser>
          } />

          <Route path='/updateAccount' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={false}>
              <Navbar />
              <UpdateAccount />
              <Footer />
            </PrivateRouterUser>
          } />

          <Route path='/adminHome' element={

            <PrivateRouterUser loginNecessary={true} adminNecessary={true}>
              <Navbar />
              <AdminHome />
              <Footer />
            </PrivateRouterUser>
          } />

          <Route path='/adminManagement' element={
            <PrivateRouterUser loginNecessary={true} adminNecessary={true}>
              <Navbar />
              <AdminManagement />
              <Footer page="adminManagement" />
            </PrivateRouterUser>
          } />

          <Route path='/forgotPassword' element={
            <PrivateRouterUser loginNecessary={false} adminNecessary={false}>
              <ForgotPassword />
              <Footer />
            </PrivateRouterUser>
          } />

          <Route path='/resetPassword' element={
            <PrivateRouterUser loginNecessary={false} adminNecessary={false}>
              <ResetPassword />
              <Footer />
            </PrivateRouterUser>
          } />



          <Route path='*' element={
            <>
              <UnknownPage />
              <Footer />
            </>
          } />
        </Routes>
      </Router>

    </>
  );
}

export default App;
