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
import axios from "axios";
import api from '../api'



function BookingID(props) {
    /*
    To do 
    1. sent studentID
    */

    const [transactions, setTransactios] =  useState([]);
    const [formData, setFormData] = useState(
        {
            host_id: 0,
            timestamp: '',
            period: '',
            friend_id1: 0,
            friend_id2: 0,
            friend_id3: 0,
          });

    const [studentId, setStudentId] = useState(['6410742362','', '', '']);
    const [termsChecked, setTermsChecked] = useState(false);
    const [valid, setValid] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const handleClickOpenPopup = () => {
        setOpenAlert(true);
    };

    const handleClosePopup = () => {
        setOpenAlert(false);
    };

    const handleChange = (event, index) => {
        const newstudentId = [...studentId];
        newstudentId[index] = event.target.value;
        setStudentId(newstudentId);
        checkStudentID(event.target.value);
      };
    
      // chackInput => valid
      const handleChecked = () => {setTermsChecked(!termsChecked);}
      const checkStudentID = (id) => {
        if (id === '' || /^\d{10}$/.test(id)) {
          console.log("Valid student ID:", id);
          return true
        } else {
          return false
        }
      };
      const handleConfirm = () => {
        if (studentId.every(id => id !== '') && termsChecked) {
            console.log("OK 202");
            setValid(true);
        } else {
            console.log("error");
            setValid(false);
        }
    };
    useEffect(() => {
        const handleConfirm = () => {
            if (studentId.every(id => id !== '') && termsChecked) {
                console.log("OK 202");
                setValid(true);
            } else {
                console.log("error");
                setValid(false);
            }
        };
    
        handleConfirm(); 
    }, [studentId, termsChecked]);
    

    // useEffect(()=> {
    //     axios.get('https://randomuser.me/api/')
    //         .then(res => setTransactios (res.data.results))
    // },[])
    // console.log("Data:",transactions)
    
    //  กำหนดTransaction
    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await api.get('/booking/all');
            setTransactios(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchTransactions();
    }, []);

    const handelInputChange = (event) => {
        const value = event.target.type === 'checkbox'? event.target.checked: event.target.value;
        setFormData({
            ...formData,
            [event.target.name]:value,
        });
    };

    //Post
    const handelFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/booking/create',formData);
        fetchTransactions();
        setFormData({
            host_id: 0,
            timestamp: '',
            period: '',
            friend_id1: 0,
            friend_id2: 0,
            friend_id3: 0,
        })
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
                    value={transactions.host_id} //formData.host_id
                    type='number'
                    variant="filled"
                    margin="dense"
                    />
                <TextField
                    error={false}
                    id="student1"
                    name="student1"
                    label="Student ID No.1"
                    variant="filled"
                    type='number'
                    value={formData.friend_id1}
                    // onChange={(event) => handleChange(event, 1)}
                    onChange={handelInputChange}
                />
                <TextField
                    error={false}
                    id="student2"
                    name="student2"
                    label="Student ID No.2"
                    variant="filled"
                    type='number'
                    value={formData.friend_id2}
                    // onChange={(event) => handleChange(event, 2)}
                    onChange={handelInputChange}
                />
                <TextField
                    error={false}
                    id="student3"
                    name="student3"
                    label="Student ID No.3"
                    variant="filled"
                    type='number'
                    value={formData.friend_id3}
                    // onChange={(event) => handleChange(event, 3)}
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
                    <Alert validInput = {valid}/>
                    {/* <Button 
                        variant="contained" 
                        disabled={false}
                        size="medium"
                        className='confirmButton'
                        onClick={handleConfirm}
                    >
                        Confirm 
                    </Button> */}

                </div>
                
            </div>

        </div>
        {/* <p>API</p>
        <div className="API">
                {transactions?.map((val,index)=>(
                    <div key={index}>
                        <p>Name: {val.name.first}</p>
                    </div>
                ))}
        </div> */}
        
        
        
    </>
  )
}

export default BookingID
