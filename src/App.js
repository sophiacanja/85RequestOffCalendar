import React from 'react';

// components for pages
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from "./components/Login";
import Logout from './components/Logout';
import UpdateAccount from './components/UpdateAccount';
import AdminHome from './components/Admin/AdminHome';
import AdminLogin from './components/Admin/AdminLogin';
import AdminManagement from './components/Admin/AdminManagement';
import UnknownPage from './components/UnknownPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//TODO: navbar

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />

          <Route path='/login' element={<Login />} />

          <Route path='/logout' element={<Logout />} />

          <Route path='/updateAccount' element={<UpdateAccount />} />

          <Route path='/adminHome' element={<AdminHome />} />

          <Route path='/adminLogin' element={<AdminLogin />} />

          <Route path='/adminManagement' element={<AdminManagement />} />
      
          <Route path='*' element={<UnknownPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
