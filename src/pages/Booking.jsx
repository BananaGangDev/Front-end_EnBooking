import { useEffect, useState } from 'react';
import BookIcon from '../assets/bookWhite.png';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BrowserRouter as Router, NavLink } from "react-router-dom";
// import { useRoute }
import api from '../api'

function Booking() {
  
  const currentTime = new Date(); 
  const [choseDate, setChoseDate] = useState(currentTime.getDate());
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const handleChoseDate = (index) => {
    setChoseDate(currentTime.getDate() + index);
  };

  const [slotTimeBooking, setSlotTimeBooking] = useState([]);
  const createBookingTime = (start, end) =>{
    const startTime = new Date();
    startTime.setDate(choseDate);
    startTime.setUTCHours(start);
    startTime.setMinutes(0);
    const endTime = new Date();
    endTime.setDate(choseDate);
    endTime.setUTCHours(end);
    endTime.setMinutes(0);
    return [startTime.toJSON() , endTime.toJSON()]

  }
  
  const handleSlotClick = (index) => {
    console.log("Index: ",time[index].bookTime);
    localStorage.setItem('startTime', time[index].bookTime[0]);
    localStorage.setItem('endTime', time[index].bookTime[1]);
  };
  
  const time = [
    { time_str: '9.00-12.00 น.', confirmTime: '08.30 - 09.00 น.' , status: !slotTimeBooking[0], bookTime: createBookingTime(9,12)},
    { time_str: '12.00-15.00 น.', confirmTime: '11.30 - 12.00 น.' , status: slotTimeBooking[1], bookTime: createBookingTime(12,15)},
    { time_str: '15.00-18.00 น.', confirmTime: '14.30 - 15.00 น.' , status: slotTimeBooking[2], bookTime: createBookingTime(15,18)},
    { time_str: '18.00-21.00 น.', confirmTime: '17.30 - 18.00 น.' , status: slotTimeBooking[3], bookTime: createBookingTime(18,21)},
    { time_str: '21.00-00.00 น.', confirmTime: '20.30 - 21.00 น.' , status: slotTimeBooking[4], bookTime: createBookingTime(21,0)},
    { time_str: '00.00-03.00 น.', confirmTime: '23.30 - 00.00 น.' , status: slotTimeBooking[5], bookTime: createBookingTime(0,3)},
  ];
  //GET Push Date
  useEffect(() => {
    const fetchSlotTime = async () => {
        const response = await api.get(`/booking/all?date=${choseDate}`);
        setSlotTimeBooking(response.data.period);
    };
  
    fetchSlotTime();
}, [choseDate]);


  const handleInputChange = (event) => {
    setSlotTimeBooking({
      ...slotTimeBooking
    })
  }

  const navLink = (index) =>{
    return "/bookingID"
  }

  return (
    <>
      <div className="header">
      <NavLink to="/">
        <ArrowBackIcon className='arrowBack' />
      </NavLink>
        <h1 className='header-container'>Booking</h1>
        <img src={BookIcon} alt="Book-logo" className="bookicon"/>
      </div>
      {/* Title */}
      <div className="timeschedule centerHorizontal">
        <div className= 'dateTime choosed' >
          <div className="date">{currentTime.getDate()}</div>
          <div className="month">{months[currentTime.getMonth()]}</div>
        </div>
        <div className="detailLocation">
          <div className="locationName">Co-working space</div>
          <div className='faculty'>At ENGR </div>
            </div>
      </div>

      <div className="schedule container">
        <div className="subtitle">Available Periods</div>
        {time.map((slot, index) => (
          <NavLink 
            key={index} 
            // onSubmit={() => handleSlotClick(index)}
            onClick={() => slot.status ? handleSlotClick(index) : null}
            to = {slot.status ? navLink(index) : null}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={`timeslot ${slot.status ? 'available' : 'reserved'}`} >
                {slot.status ? 
                  (
                    <div>
                      <div className='bookingtime'>{slot.time_str}</div>
                      <div className='confirmtime'>Open confirm {slot.confirmTime}</div> 
                    </div>
                  ) : 
                  (
                    <div>
                      <div className='bookingtime'>End period</div> 
                      <div className='confirmtime'>{slot.time_str}</div>
                    </div>
                  )
                }
              {slot.status ? (
                    <ControlPointIcon sx={{ fontSize: 30}} />
                ) : (
                    <CancelOutlinedIcon sx={{ fontSize: 30}} />
                )}
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Booking;