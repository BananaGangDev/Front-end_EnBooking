import { useState } from 'react';
import '/src/styles/LoginPage.css';
import HeadPic from '/src/assets/vidvabuilding.jpg';
import LogoPic from '/Users/kanpitchahong-ek/enbooking/src/assets/EnBookingLogo.jpeg'
import { Link } from 'react-router-dom';
// import axios from 'axios';
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

    try {
      const response = await api.get(`/signup/log_in?users_id=${student_info_id}&password=${password}`, loginData)
      if (response.status === 200) {
        // Assuming the backend sends back some form of user data or token on successful login
        console.log('Login successful:', response.data);
        // setIsLoggedIn(true);
        // Store student_info_id in localStorage
        localStorage.setItem('student_info_id', response.data.student_info_id);
        // ไปหน้า homepage
        navigate('/homepage');
      } else {
        // Handle other messages from the backend, e.g., incomplete phone number or ID already registered
        setErrors({ global: response.data.message });
      }
    }
    catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Display error message from backend
      } else {
        alert('Login failed. Please try again.');
      }
    }  
  };

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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="forgot">
              {/* <p>Forgot your password? <Link to="/reset_password">Click Here</Link> </p> */}
                <p>Do not have an account? <Link to="/signup">Click here to sign up</Link> </p>
              </div>

              <button type='submit'>Sign In</button>
              <Link to="/homepage">homepage</Link>

            </div>
        </form>
    </div>
  );
}

export default LoginForm;