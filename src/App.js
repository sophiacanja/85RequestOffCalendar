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

          <Route path='/forgotPassword' element={
            <PrivateRouterUser loginNecessary={false} adminNecessary={false}>
              <ForgotPassword />
            </PrivateRouterUser>
          } />

          {/* //TODO create own route component for forgot password */}

          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
