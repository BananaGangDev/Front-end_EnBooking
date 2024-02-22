import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import Dialog from '@mui/material/Dialog';
// import DialogText from '@mui/material/DialogText';
// import DialogTitle from '@mui/material/DialogTitle';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import api from '/src/api.jsx'

export default function AlertDialog() {
  const [open, setOpen] = useState(false);
  const student_info_id = localStorage.getItem('student_info_id')
  const [allId, setAllId] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [bookingTime, setBookingTime] = useState({startTime: '', endTime: ''})
  // const [indexUser, setIndexUser] = useState()
  const [statusConfirm,setStatusConfirm] = useState(undefined);
  const [showMessage, setShowMessage] = useState(false); // ใช้สำหรับแสดงข้อความ "No booking today"
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // API : get /booking/user
  useEffect(() => {
    const userBooking = async () => {
       try {
        const response = await api.get(`/booking/user?user_id=${student_info_id}`);
        if (response.status === 200) {
          setBookingTime({
            startTime: response.data.start_time,
            endTime: response.data.end_time,
          });
          // setStatusComfirm(response.data.confirmation_status);
          // setShowMessage(false);
          const ids = [response.data.host_id, response.data.friend_id1, response.data.friend_id2, response.data.friend_id3]
          const statuses = [response.data.confirmation_host, response.data.confirmation1, response.data.confirmation2, response.data.confirmation3];

          setAllId(ids);
          setAllStatus(statuses);

          // คำนวณ index และ statusConfirm ทันทีหลังจาก set state
          const index = ids.indexOf(parseInt(student_info_id));
          if (index !== -1) {
            setStatusConfirm(statuses[index]);
          }
        } else if (response.status === 400) {
          setShowMessage(true);
        }
       } catch (error) {
        console.error("An error occurred: ", error);
       }
    };
    userBooking();
  }, [student_info_id]);

  const isHost = student_info_id === allId[0]?.toString(); // ตรวจสอบว่า user_id ตรงกับ host_id หรือไม่

    // setAllId([response.data.host_id
    //   ,response.data.friend_id1
    //   ,response.data.friend_id2
    //   ,response.data.friend_id3])
    // setAllStatus([response.data.confirmation_host
    //   ,response.data.confirmation1
    //   ,response.data.confirmation2
    //   ,response.data.confirmation3])
    // setIndexUser(allId.indexOf(parseInt(student_info_id)))
    // setStatusComfirm(allStatus[indexUser])

  const handleConfirm = async () => {
    try {
      const response = await api.put(`/booking/confirm?student_id=${student_info_id}`);
      if (response.status === 200) {
        setStatusConfirm(true);
        setShowMessage(false);
        setOpen(false);
      } else {
        console.error("Error confirming booking:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while confirming booking:", error);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await api.delete(`/booking/confirm?student_id=${student_info_id}`);
      if (response.status === 200) {
        setStatusConfirm(false);
        setShowMessage(true);
        setOpen(false);
      } else {
        console.error("Error canceling booking:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while canceling booking:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createDate = (timeJSON) =>{
    const event = new Date(timeJSON)
    // console.log('Hours: ',event.getHours());
    // console.log(event);
    return event
  }
    

  return (
    <React.Fragment>
      <Button variant="outlined" className="mybooking-btn" onClick={handleClickOpen}>
        My booking
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <div className='mybooking'>
          <div className="mybooking-inner">
            <DialogActions className='close-ctn'>
              <CancelOutlinedIcon onClick={handleClose} className='close-btn'/>
            </DialogActions>
            
            <div className='title'>
            {"My Booking"}
            </div>
            <div>
              <div  className='booking-info' id='booking-info'>
                <div id="description-Date">
                  <div>{createDate(bookingTime.startTime).getDate()}</div>
                  <div>{months[createDate(bookingTime.startTime).getMonth()]}</div>
                </div>
              </div>
              
              <div id="description" className='booking-info'>

                <div className='context'>
                <LocationOnOutlinedIcon sx={{ fontSize: 30}} />
                <div>TSE Co-Working Space</div>
              </div>
              <div className='context'> 
                <AccessAlarmsOutlinedIcon sx={{ fontSize: 30}} />
                <div className="time-context">{createDate(bookingTime.startTime).getHours()}.00 - 
                {createDate(bookingTime.endTime).getHours()}.00น. </div>
                </div> 
              </div>
            </div>
              

            <div id='btn-group'>
              {/* {isHost && (
                <Button className='cancle-btn btn' onClick={handleCancel}>Cancle</Button>
              )}
            <Button className='confirm-btn btn' onClick={handleConfirm} autoFocus> Confirm</Button> */}
              {!statusConfirm && ( // แสดงปุ่มเฉพาะเมื่อ statusConfirm เป็น false
                <React.Fragment>
                  {isHost && (
                    <Button className='cancle-btn' onClick={handleCancel}>Cancel</Button>
                  )}
                  <Button className='confirm-btn' onClick={handleConfirm} autoFocus> Confirm</Button>
                </React.Fragment>
              )}
              {statusConfirm && ( // แสดงข้อความเฉพาะเมื่อ statusConfirm เป็น true
                <div>Confirmed successfully</div>
              )}
            </div>
          </div>
          
          
        </div>

      </Dialog>
        
    </React.Fragment>
  );
}