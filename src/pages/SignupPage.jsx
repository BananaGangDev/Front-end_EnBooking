import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HeadPic from '/src/assets/vidvabuilding.jpg';
import LogoPic from '/Users/kanpitchahong-ek/enbooking/src/assets/EnBookingLogo.jpeg'
import api from'/src/api.jsx'

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    student_info_id: '',
    major: '',
    year: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // set current time เมื่อมีการ click
  const handleClick = () => {
    const event = new Date();
    const options = { timezone: 'Asia/Bangkok'};
    const start_register = event.toLocaleString('en-GB', options);
    return start_register;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // เตรียม data
    const userData = {
      student_info_id: parseInt(formData.student_info_id),
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone.toString(),
      start_register: handleClick(),
      end_register: null,
      major: formData.major,
      year: parseInt(formData.year),
      password: formData.password,
    };

    console.log(userData);

    // ตรวจสอบการ sign up กับ backend
    try {
      const response = await api.post(`/signup/create_new_user`, userData);
      if (response.status === 201) {
        alert("Your account was created successfully")
        // ไปที่หน้า login ถ้า sign up สำเร็จ
        navigate('/');
      } else {
        setErrors({ global: response.data.message });
      }
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data && error.response.data.detail) {
        // alert ข้อความจาก backend
        alert(`Error: ${error.response.data.detail}`);
      } else {
        alert("An error occurred during signup. Please try again.");
      }    
    }
  };

  // sign up page
  return (
    <div className='s-wrapper'>
      <form onSubmit={handleSubmit}>
        {errors.global && <p className="error">{errors.global}</p>}

        <div className="s-head-container">
            <img src={HeadPic} alt="Headpic" className="s-head-pic"/>
        </div>

        <div className="signup-container">
            <img src={LogoPic} alt="LogoPic" className="s-logo-pic"/>
            <h1>Sign Up</h1>
            <div className="s-input-box">
                <input
                type="text"
                name="firstname"
                placeholder='Firstname'
                required
                value={formData.firstname}
                onChange={handleInputChange}
                />
                {errors.firstname && <p>{errors.firstname}</p>}

                <input
                type="text"
                name="lastname"
                placeholder='Lastname'
                required
                value={formData.lastname}
                onChange={handleInputChange}
                />
                {errors.lastname && <p>{errors.lastname}</p>}

                <input
                type="number"
                name="student_info_id"
                placeholder='Student ID'
                required
                value={formData.student_info_id}
                onChange={handleInputChange}
                />
                {errors.student_info_id && <p>{errors.student_info_id}</p>}
                
                <input
                type="number"
                name="phone"
                placeholder='Phone number'
                required
                value={formData.phone}
                onChange={handleInputChange}
                />
                {errors.phone && <p>{errors.phone}</p>}

                <input
                type="text"
                name="major"
                placeholder='Major'
                required
                value={formData.major}
                onChange={handleInputChange}
                />
                {errors.major && <p>{errors.major}</p>}

                <input
                type="number"
                name="year"
                placeholder='Year'
                required
                value={formData.year}
                onChange={handleInputChange}
                />
                {errors.year && <p>{errors.year}</p>}

                <input
                type="text"
                name="password"
                placeholder='Password'
                required
                value={formData.password}
                minLength={8}
                maxLength={24}
                onChange={handleInputChange}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>

          <div className='btn-container'>
            <button type='submit' onClick={handleClick}>Sign Up</button>
          </div>
          
          <div className="back-to-login">
            <p>Already have an account? <Link to="/">Sign in here</Link></p>
          </div>
        </div>

      </form>
    </div>
  );
}

export default SignupForm;