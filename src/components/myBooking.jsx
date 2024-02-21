import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
// import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';


export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <div className="mybooking">

      </div> */}
      <Button variant="outlined" className="mybooking-btn" onClick={handleClickOpen}>
        My booking
        {/* <EventAvailableTwoToneIcon /> */}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='mybooking'
      >
        <div >
          <DialogActions>
          <CancelOutlinedIcon onClick={handleClose} className='closed-btn'/>
          </DialogActions>
          
          <DialogTitle id="title">
          {"My Booking"}
        </DialogTitle>
        <DialogContent className='booking-info'>
          <DialogContentText id="description">
            5 FED
          </DialogContentText>
          
        </DialogContent>
        <div className='booking-info'>
          <div >
            <p>ใส่วันที่ที่จอง</p>
          </div>

          <div className='context'>
            <LocationOnOutlinedIcon />
            <p>TSE Co-Working Space</p>
          </div>
          <div className='context'> 
            <AccessAlarmsOutlinedIcon />
            <p>9.00 - 10.00น. </p>
          </div>

        </div>

            <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
          
        </div>

      </Dialog>
        {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='mybooking'
      >
        <DialogTitle id="title">
          {"My Booking"}
        </DialogTitle>
        <DialogContent className='booking-info'>
          <DialogContentText id="description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <div className='booking-info'>
          <div>
            <p>ใส่วันที่ที่จอง</p>
          </div>

          <div>
            <LocationOnOutlinedIcon />
            <p>TSE Co-Working Space</p>
          </div>

          <div>
            <AccessAlarmsOutlinedIcon />
          </div>

        </div>

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
         */}
    </React.Fragment>
  );
}