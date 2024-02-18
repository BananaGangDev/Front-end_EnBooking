import { useState } from 'react';
import BookIcon from '../assets/bookWhite.png';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BrowserRouter as Router, NavLink } from "react-router-dom";



function Booking() {
  const [slotTime, setSlotTime] = useState(null);
  const time = [
    { bookingTime: '9.00-12.00 น.', confirmTime: '08.30 - 09.00 น.',period: '9-12' },
    { bookingTime: '12.00-15.00 น.', confirmTime: '11.30 - 12.00 น.' },
    { bookingTime: '15.00-18.00 น.', confirmTime: '14.30 - 15.00 น.' },
    { bookingTime: '18.00-21.00 น.', confirmTime: '17.30 - 18.00 น.' },
    { bookingTime: '21.00-00.00 น.', confirmTime: '20.30 - 21.00 น.' },
    { bookingTime: '00.00-03.00 น.', confirmTime: '23.30 - 00.00 น.' },
  ];
  const currentTime = new Date();
  const dateString = currentTime.toDateString().split(' ');
  const timeString = currentTime.toTimeString().split(' ')[0]; // time
  const [choseTime,setChoseTime] = useState(currentTime.getDate())
  const handleSlotClick = (index) => {
    setSlotTime(index);
  };
  const handleChoseTime = (index) => {
    setChoseTime(new Date().getDate() + index)
};


  return (
    <>
      <div className="header">
      <NavLink to="/">
        <ArrowBackIcon className='arrowBack' />
      </NavLink>
        <h1 className='header-container'>Booking</h1>
        <img src={BookIcon} alt="Book-logo" className="bookicon"/>
      </div>
      <div className="calendar centerHorizontal">
        {[...Array(4)].map((_, index) => {
          const createTime = new Date();
          createTime.setDate(currentTime.getDate() + index);
          const dateString = createTime.toDateString().split(' ');
          return (
            <div className="cardDate centerVertical">
              <div className="day">{dateString[0]}</div>  
              <div 
                className={`dateTime ${choseTime == createTime.getDate() ? 'choosed' : ''}`}
                key={index} 
                onClick={() => handleChoseTime(index)}
              >
                <div className="date">{createTime.getDate()}</div>
                <div className="month">{dateString[1]}</div>
              </div>
            </div>

          );
        })}
      </div>

      <div className="schedule container">
        <div className="subtitle">Available Periods</div>
        {time.map((slot, index) => (
      <NavLink 
        key={index} 
        to = "/bookingID" 
        style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="timeslot" onClick={() => handleSlotClick(index)}>
          <div className="timeslotContainer">
            <div>
              <div className='bookingtime'>{slot.bookingTime}</div>
              <div className='confirmtime'>Open confirm {slot.confirmTime}</div>
            </div>
          </div>
          <ControlPointIcon sx={{ fontSize: 30}} />
        </div>
      </NavLink>
    ))}
      </div>
    </>
  );
}

export default Booking;
