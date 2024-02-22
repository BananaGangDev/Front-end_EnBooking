import { useState } from 'react';
import '/src/styles/LoginPage.css';
import HeadPic from '/src/assets/vidvabuilding.jpg';
import LogoPic from '/src/assets/EnBookingLogo.jpeg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '/src/api.jsx'

const LoginForm = () => {
  const [student_info_id, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // เตรียม login data
    const loginData = {
      student_info_id: parseInt(student_info_id),
      password: password,
    };

    console.log(loginData);

    // ตรวจสอบการ log in กับ backend
    try {
      const response = await api.get(`/signup/log_in?users_id=${student_info_id}&password=${password}`, loginData)
      if (response.status === 200) {
        alert("Login successfully!")
        console.log('response: ', response.data);
        // เก็บ student_info_id ไว้ใน localStorage
        localStorage.setItem('student_info_id',student_info_id);
        console.log('User id: ',localStorage.student_info_id);
        // ไปหน้า homepage
        navigate('/homepage');
      } else {
        setErrors({ global: response.data.message });
      }
    }
    catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        // alert ข้อความจาก backend
        alert(`Error: ${error.response.data.detail}`);
      } else {
        alert("An error occurred during signup. Please try again.");
      }
    }     
  };

  // log in page
  return (
    <div className='wrapper'>
        <form onSubmit={handleLogin}>

            <div className="head-container">
              <img src={HeadPic} alt="Headpic" className="head-pic"/>
            </div>

            <div className="login-container">
              <img src={LogoPic} alt="LogoPic" className="logo-pic"/>
              <div className="input-box1">
                <input
                  type="number"
                  placeholder='Student ID'
                  required
                  value={student_info_id}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-box2">
                <input
                  type="text"
                  placeholder='Password'
                  required
                  value={password}
                  minLength={8}
                  maxLength={24}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="forgot">
                <p>Do not have an account? <Link to="/signup">Click here to sign up</Link> </p>
              </div>

              <button type='submit'>Sign In</button>
            </div>

        </form>
    </div>
  );
}

export default LoginForm;