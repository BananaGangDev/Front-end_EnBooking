// import React from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import covidva from '/src/assets/Booking.png';
import MyBooking from '../components/myBooking'
import api from '/src/api.jsx';

const Homepage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  // เรียกใช้ค่า student_info_id จาก localStorage
  const student_info_id = localStorage.getItem('student_info_id');

    if (!student_info_id) {
      navigate('/');
    } else {
      // Fetch user data โดยใช้ student_info_id
      fetchUserData(student_info_id);
    }
  }, [navigate]);

  // รับค่า student_info_id จาก backend มาใช้เป็น userData
  const fetchUserData = async (student_info_id) => {
    try {
      const response = await api.get(`/signup/get_user_by_id?user_id=${student_info_id}`);
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching user data: ', error)
      navigate('/')
    }
  };

  const handleSignOut = () => {
    // ลบ student_info_id จาก localStorage เมื่อผู้ใช้ออกจากระบบ
    localStorage.removeItem('student_info_id');
    setUserData(null);
    // กลับไปที่หน้า log in
    navigate('/');
  };

  const goToBookingPage = () => {
    navigate('/booking');
  };

  // แสดงข้อความ Loading... ถ้ายังไม่มีข้อมูลผู้ใช้ หรือยังดึงข้อมูลมาไม่สำเร็จ
  if (!userData) {
    return <div>Loading...</div>;
  }

  // homepage
  return (
    <div className="homepage">

      <div className="sign-out" onClick={handleSignOut}>
        <button>Sign Out</button>
      </div>

      <div className="header">
        <div className="line1">
          <p className='user-id'>Id: {userData.student_info_id}</p>
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

        <div className='my-booking-ctn'>
          <MyBooking />
        </div>
      </div>

    </div>
  );
};

export default Homepage;
