import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Error from '../assets/error.png'
import Checkmark from '../assets/checkmark.png'
import api from '../api'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  // OPEN CLOSE ALERT
  const handleClickOpen = () => {
    setOpen(true);
    handelFormSubmit();
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("Input" ,props.studentId)

  const getTimeSubmit = () =>{
    let timeSubmit = new Date().toJSON();
    console.log('time:',timeSubmit);
}
const handelFormSubmit = async () => {
  // event.preventDefault();
  // const res = await api.post('/booking/create',formData);
  // console.log(res)
  // fetchTransactions();
  getTimeSubmit()
  }

  return (
    <React.Fragment>
      <Button className='confirmButton' variant="filled" onClick={handleClickOpen} >
        Confirm
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className='popup'
      >
        <div className="popup-inner">
          <DialogActions>
          <CancelOutlinedIcon onClick={handleClose} className='closed-btn'/>
          </DialogActions>
          {props.validInput ? 
            <div>
              <DialogTitle>
              <img src={Checkmark} alt="CheckMark" className="imagePopup"/>
              </DialogTitle>
              <DialogTitle>{"Successful Booking"}</DialogTitle>
            </div> : 
            <div>
              <DialogTitle>
                <img src={Error} alt="Error" className="imagePopup"/>
              </DialogTitle>
              <DialogTitle>{"Please complete the form"}</DialogTitle>
            </div>
          }
        </div>

      </Dialog>
    </React.Fragment>
  );
}
