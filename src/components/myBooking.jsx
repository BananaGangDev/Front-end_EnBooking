import * as React from 'react';
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
                  <div>5</div>
                  <div>Feb</div>
                </div>
              </div>
              
              <div id="description" className='booking-info'>

                <div className='context'>
                <LocationOnOutlinedIcon sx={{ fontSize: 30}} />
                <div>TSE Co-Working Space</div>
              </div>
              <div className='context'> 
                <AccessAlarmsOutlinedIcon sx={{ fontSize: 30}} />
                <div>9.00 - 10.00น. </div>
                </div> 
              </div>
            </div>
              

            <div id='btn-group'>
            <Button className='cancle-btn btn' onClick={handleClose}>Cancle</Button>
            <Button className='confirm-btn btn' onClick={handleClose} autoFocus> Confirm</Button>
            </div>
          </div>
          
          
        </div>

      </Dialog>
        
    </React.Fragment>
  );
}