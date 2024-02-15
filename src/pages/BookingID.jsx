import { useState } from 'react'
import BookIcon from '../assets/bookWhite.png'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiFormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';



function BookingID() {

  return (
    <>
        <div className="header">
        <ArrowBackIcon 
            sx={{ fontSize: 40 , color: '#fff' }} />

            <h1 className='header-container'>Booking</h1>
            <img src={BookIcon} alt="Book-logo" className="bookicon"/>
        </div>
        <div className="timeschedule centerHorizontal">
            <div className="dateTime">
                <div className="date">5</div>
                <div className="month">Feb</div>
            </div>
            <div className="detailBooking">
                 <div className="locationName"><LocationOnOutlinedIcon/> ENGR Co-working space</div>
                 <div className="timeBooking">
                    <AccessAlarmsOutlinedIcon/>
                    <div className="timeBooking-detail">
                        <div>Monday 09.00 - 12.00  (3 hours)</div>
                        <div>09.00 - 12.00  (3 hours)</div>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div className="container center">
            <div className="formID centerHorizontal">
                <form>
                <label className='studentId'>Host Id</label><br/>
                <form noValidate autoComplete="off">
                    <FormControl  >
                        <OutlinedInput type='number' placeholder="Student Id ..." />
                    </FormControl>
                </form>

                <hr/>
                <label className='studentId'>Student Id No.1</label><br/>
                <form noValidate autoComplete="off">
                    <FormControl 
                        className='idInput' 
                        >
                        <OutlinedInput type='number' placeholder="Student Id ..." />
                    </FormControl>
                </form>
                <label className='studentId'>Student Id No.2</label><br/>
                <form noValidate autoComplete="off">
                    <FormControl 
                        className='idInput'
                        >
                        <OutlinedInput type='number' placeholder="Student Id ..." />
                    </FormControl>
                </form>
                <label className='studentId'>Student Id No.3</label><br/>
                <form noValidate autoComplete="off">
                    <FormControl 
                        className='idInput'
                        >
                        <OutlinedInput label="Filled" type='number' placeholder="Student Id ..." />
                    </FormControl>
                </form>
            </form>
            </div>

            <div className="footer centerHorizontal">
                <div className='note'><InfoOutlinedIcon/> Note</div>
                <div className='note'> 1. Host จะเป็นเพียงคนเดียวที่สามารถยกเลิกการจองได้</div>
                <div className='note'>2.  ผู้ใช้งานสามารถยืนยันการใช้ห้องได้ก่อน 30 นาที</div>
                <FormGroup className='note'>
                    <FormControlLabel control={<Checkbox  />} 
                    label="ฉันอ่านและยอมรับเงื่อนไข" />
                </FormGroup>
                <div className="centerHorizontal">
                    <Button 
                variant="contained" 
                disabled={false}
                size="medium"
                className='confirmButton'
                >
                    Confirm
                </Button>
                </div>
                
            </div>

            
        </div>
        
        
    </>
  )
}

export default BookingID
