import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Booking from './pages/Booking.jsx'
import BookingID from './pages/BookingID.jsx'
import Demo from './components/Alert.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import './index.css'
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingID" element={<BookingID />} />

        <Route path="*" element={<> not found</>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
