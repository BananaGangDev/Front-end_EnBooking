import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Booking from './pages/Booking.jsx'
import BookingID from './pages/BookingID.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingID />} />

        <Route path="*" element={<> not found</>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
