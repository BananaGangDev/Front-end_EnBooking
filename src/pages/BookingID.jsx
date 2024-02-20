import { useEffect, useState } from 'react'
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
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Alert from '../components/Alert'
import api from '../api'



function BookingID() {
    // GET HOST ID
    const userArray = ["Obaseki",25]
    // localStorage.setItem('user', JSON.stringify(userArray));

    const [transactions, setTransactions] =  useState([]);
    const [formData, setFormData] = useState(
        {
            host_id: '1234',
            timestamp: '',
            friend_id1: '',
            friend_id2: '',
            friend_id3: '',
          });

    // useEffect(() => {
    //     const fetchHostId = async () => {
    //         try {
    //             const response = await api.get(`/signup/get_user_by_id?user_id=3`);
    //             setStudentId(prevStudentId => [response.data.student_info_id, ...prevStudentId.slice(1)]);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     fetchHostId();
    // }, []);

    
    const [termsChecked, setTermsChecked] = useState(false);
    const [valid, setValid] = useState(false);

    const handleClickOpenPopup = () => {
        setOpenAlert(true);
    };

    const handleClosePopup = () => {
        setOpenAlert(false);
    };

    
      // chackInput => valid
      const handleChecked = () => {setTermsChecked(!termsChecked);}
    //   const checkStudentID = (id) => {
    //     if (id === '' || /^\d{10}$/.test(id)) {
    //       console.log("Valid student ID:", id);
    //       return true
    //     } else {
    //       return false
    //     }
    //   };

    //Heck input and setAlert
    useEffect(() => {
        if (
            formData.host_id !== '' &&
            formData.friend_id1 !== '' &&
            formData.friend_id2 !== '' &&
            formData.friend_id3 !== ''
          ) {
            setValid(true)
            console.log('All fields have non-empty values');
          } else {
            setValid(false)
            console.log('One or more fields have empty values');
          }
       
    }, [formData, termsChecked]);

    //Change data in formData
    const handelInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    console.log(formData)
    
    
    // useEffect(() => {
    //     const handelFormSubmit = async (event) => {
    //         event.preventDefault();
    //         const res = await api.post('/booking/create',formData);
    //         console.log(res)
    //         fetchTransactions();
    //         setFormData({
    //             host_id: studentId[0],
    //             timestamp: '',
    //             period: '',
    //             friend_id1: '',
    //             friend_id2: '',
    //             friend_id3: '',
    //         })
    //     };
    //     studentId();
    // }, []);

    //sent DATA
    const handelFormSubmit = async (event) => {
        event.preventDefault(); 
    
        try {
            const res = await api.post('/booking/create', formData);
            console.log('Responce:',res); 
    
            console.log('Form data submitted successfully!');
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
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
        <div className="timeschedule centerHorizontal">
            <div 
                className= 'dateTime choosed'
                >
                <div className="date">17</div>
                <div className="month">Feb</div>
            </div>
            <div className="detailBooking">
                <div className="centerHorizontal">
                    <LocationOnOutlinedIcon/><div className="locationName "> ENGR Co-working space</div>
                </div>
                 <div className="timeBooking">
                    <AccessAlarmsOutlinedIcon/>
                    <div className="timeBooking-detail">
                        <div>Monday</div>
                        <div>09.00 - 12.00  (3 hours)</div>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div className="container center">
            
            <div className="formID">
            
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
                className='friendId centerVertical '
                >
                <TextField
                    id="host_id"
                    name="host_id"
                    label="Host ID"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={formData.host_id} //formData.host_id
                    type='number'
                    variant="filled"
                    margin="dense"
                    />
                <TextField
                    error={false}
                    id="friend_id1"
                    name="friend_id1"
                    label="Student ID No.1"
                    variant="filled"
                    type='number'
                    value={formData.friend_id1}
                    onChange={handelInputChange}
                />
                <TextField
                    error={false}
                    id="friend_id2"
                    name="friend_id2"
                    label="Student ID No.2"
                    variant="filled"
                    type='number'
                    value={formData.friend_id2}
                    onChange={handelInputChange}
                />
                <TextField
                    error={false}
                    id="friend_id3"
                    name="friend_id3"
                    label="Student ID No.3"
                    variant="filled"
                    type='number'
                    value={formData.friend_id3}
                    onChange={handelInputChange}
                />
            </Box>

            </div>

            <div className="footer">
                <div className='note'><InfoOutlinedIcon/> Note</div>
                <div className='note'> 1. Host จะเป็นเพียงคนเดียวที่สามารถยกเลิกการจองได้</div>
                <div className='note'>2.  ผู้ใช้งานสามารถยืนยันการใช้ห้องได้ก่อน 30 นาที</div>
                <FormGroup className='note'>
                    <FormControlLabel 
                    control={<Checkbox  checked={termsChecked}
                                        onChange={handleChecked}
                                        />} 
                    label="ฉันอ่านและยอมรับเงื่อนไข" />
                </FormGroup>

                <div className="centerHorizontal">
                    <Alert validInput={valid} />
                </div>
                
            </div>

        </div>

    </>
  )
}

export default BookingID

