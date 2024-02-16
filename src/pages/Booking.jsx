import { useState } from 'react'
// import Calendar from '../components/calendar'
import BookIcon from '../assets/bookWhite.png'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Successful from '../components/successBooking';


function Booking() {
  const [slotTime, setSlotTime] = useState(0)
  const time = [
    { bookingTime: '9.00-12.00 น.', confirmTime: '08.30 - 09.00 น.' },
    { bookingTime: '12.00-15.00 น.', confirmTime: '11.30 - 12.00 น.' },
    { bookingTime: '15.00-18.00 น.', confirmTime: '14.30 - 15.00 น.' },
    { bookingTime: '18.00-21.00 น.', confirmTime: '17.30 - 18.00 น.' },
    { bookingTime: '21.00-00.00 น.', confirmTime: '20.30 - 21.00 น.' },
    { bookingTime: '00.00-03.00 น.', confirmTime: '23.30 - 00.00 น.' },
  ];
  console.log(`SlotTime Index:${slotTime}`)

  return (
    <>
        <div className="header">
        <ArrowBackIcon 
            sx={{ fontSize: 40 , color: '#fff' }} />

            <h1 className='header-container'>Booking</h1>
            <img src={BookIcon} alt="Book-logo" className="bookicon"/>
        </div>
        <div className="schedule">
            <div className="subtitle">Available Periods</div>
            {time.map((slot, index) => (
                <div className="timeslot">
                    <div
                        key={index}
                        onClick={() => setSlotTime(index)}
                        className="timeslotContainer"
                >
                        <div>
                        <div className='bookingtime'>{slot.bookingTime}</div>
                        <div className='confirmtime'>Open confirm {slot.confirmTime}</div>
                        </div>
                    
                    </div>
                    <ControlPointIcon sx={{ fontSize: 30}} />
                </div>
                
                ))}
        </div>
        

    </>
  )
}

export default Booking
