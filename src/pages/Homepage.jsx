// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// import covidvaImage from '/Users/kanpitchahong-ek/enbooking/src/assets/CoVidva.jpeg';
// // import { FaRegCalendarCheck } from "react-icons/fa6";
// // import { LiaSignOutAltSolid } from "react-icons/lia";

// const Homepage = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);

// //   useEffect(() => {
// //     // Retrieve student_info_id from localStorage
// //     const studentInfoId = localStorage.getItem('student_info_id');

// //     if (!studentInfoId) {
// //       navigate('/');
// //     } else {
// //       // Fetch user data using the student_info_id
// //       fetchUserData(studentInfoId);
// //     }
// //   }, [navigate]);

// //   const fetchUserData = async (studentInfoId) => {
// //     try {
// //         const response = await axios.get(`http://127.0.0.1:5660/signup/get_user_by_id/${studentInfoId}`);
// //         setUserData(response.data);
// //     } catch (error) {
// //         console.error('Error fetching user data: ', error)
// //         navigate('/')
// //     }
// //   };

//   const handleSignOut = () => {
//     localStorage.removeItem('student_info_id'); // ลบ userId จาก localStorage เมื่อผู้ใช้ออกจากระบบ
//     setUserData(null);
//     navigate('/'); // นำผู้ใช้กลับไปยังหน้า login
//   };

//   const goToBooking = () => {
//     navigate('/booking'); // นำผู้ใช้ไปยังหน้า booking
//   };

//   // หากยังไม่ได้ดึงข้อมูลผู้ใช้ ให้แสดงข้อความ Loading...
// //   if (!userData) {
// //     return <div>Loading...</div>;
// //   }

//   return (
//     <div className="homepage">
//       <header className="header">
//         {/* <LiaSignOutAltSolid className="arrowBack" onClick={handleSignOut}/> */}
//         <button className='signoutBttn' onClick={handleSignOut}>Sign Out</button>
//         <div>Id: {userData.student_info_id}</div>
//       </header>
//       <div className='container'>
//         <div className="study-room" onClick={goToBooking}>
//             <img src={covidvaImage} alt="Co vidva" />
//         </div>
//         <div>Categories</div>
//         <button onClick={goToBooking}>My booking</button>
//       </div>
//     </div>
//   );
// };

// export default Homepage;

//-----------------------------------------------------------//
// import React from 'react';
import { useNavigate } from 'react-router-dom';
import covidva from '/Users/kanpitchahong-ek/enbooking/src/assets/Booking.png';
import MyBooking from '../components/myBooking'
// import EventAvailableIcon from '@mui/icons-material/EventAvailable';


const Homepage = () => {
  const navigate = useNavigate();
// const [valid, setValid] = useState(false);

  // Function to navigate to the booking page
  const goToBookingPage = () => {
    navigate('/booking');
  };

  const goToLoginPage = () => {
    navigate('/');
  }

  // Function to open the My Booking section
  const openMyBooking = () => {
    navigate('/myBooking')
  };

  return (
    <div className="homepage">
      <div className="sign-out" onClick={goToLoginPage}>
        <button>Sign Out</button>
      </div>
      <div className="header">
        <div className="user-info">
            <p>Id: 64107425x0</p>
        </div>
        <div className="line1">
            <p className='p-study'>Study room</p>
        </div>
      </div>

      <div className="container">
        <div className="image-container" onClick={goToBookingPage}>
            <img src={covidva} alt="Engr Coworking"/>
        </div>
        <div className="line2">
            <p className="p-cate">Categories</p>
        </div>    
        {/* 
        <button className="my-booking-btn" onClick={openMyBooking}>My booking</button> */}
        {/* <EventAvailableIcon className="my-booking-icon"/> */}
        <div className='my-booking-ctn'>
          <MyBooking />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
