import React from 'react'
import ReactDOM from 'react-dom/client'
import Booking from './pages/Booking.jsx'
import BookingID from './pages/BookingID.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import './styles/main.css';

import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Homepage from '/src/pages/Homepage.jsx'
import MyBooking from '/src/components/myBooking.jsx';
import noBooking from '/src/components/noBooking.jsx';
import Report from '/src/components/Report.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="myBooking" element={<MyBooking />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingID" element={<BookingID />} />
        <Route path="/noBooking" element={<noBooking />} />
        <Route path="/report" element={<Report />} />

        <Route path="*" element={<> not found</>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);