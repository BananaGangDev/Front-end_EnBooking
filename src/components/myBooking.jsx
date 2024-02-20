import { useState, useEffect } from 'react';
import axios from 'axios';
// import noBookingImage from './path-to-your-no-booking-image.jpg'; // Path to your no booking image
import { RxCrossCircled } from "react-icons/rx";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';

const MyBooking = () => {
  const [bookingData, setBookingData] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    // Fetch the booking data from the backend
    const fetchBookingData = async () => {
      try {
        const response = await axios.get('/api/booking/today');
        setBookingData(response.data);
        setIsCancelled(response.data.isCancelled);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData();
  }, []);

  const handleConfirm = async () => {
    try {
      // Send confirmation to the backend
      const response = await axios.post('/api/booking/confirm', { id: bookingData.id });
      if (response.status === 200) {
        setIsConfirmed(true);
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const handleCancel = async () => {
    try {
      // Send cancellation to the backend
      const response = await axios.post('/api/booking/cancel', { id: bookingData.id });
      if (response.status === 200) {
        setIsCancelled(true);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  if (!bookingData || isCancelled) {
    return (
      <div className="my-booking">
        <p>No booking today</p>
        {/* <img src={noBookingImage} alt="No booking" /> */}
      </div>
    );
  }

  return (
    <div className="my-booking">
      <div className="booking-info">
        <div className='exit-container'>
          <RxCrossCircled className='exit-icon'/>
        </div>
        <p>{bookingData.date}</p>
        <div className='location-container'>
          <LocationOnOutlinedIcon className='location-icon'/>
        </div>
        <div className='time-container'>
          <AccessAlarmsOutlinedIcon className='time-icon'/>
        </div>
        
        <p>{bookingData.time}</p>
      </div>
      <div className="booking-status">
        {isConfirmed ? (
            <h1>Already confirmed</h1>
        ) : (
            <>
            <button className="btn1" onClick={handleConfirm}>Confirm</button>
            <button className="btn2" onClick={handleCancel}>Cancel</button>
            </>
        )}
      </div>
    </div>
  );
};

export default MyBooking;