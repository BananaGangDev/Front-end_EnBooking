import React, { useEffect, useState } from "react";
import "/src/styles/LoginPage.css";
import HeadPic from "/src/assets/vidvabuilding.jpg";
import LogoPic from "/src/assets/EnBookingLogo.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import api from "/src/api.jsx";

const AlertPopup = React.forwardRef((props, ref) => (
  <Stack sx={{ width: "80%" }}>
    <Alert variant="outlined" severity="error">
    {props.children}
    </Alert>
  </Stack>
));

const LoginForm = () => {
  const [student_info_id, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // เตรียม login data
    const loginData = {
      student_info_id: parseInt(student_info_id),
      password: password,
    };

    console.log(loginData);
    // useEffect(() => {

    // },[]);
    // ตรวจสอบการ log in กับ backend
    try {
      const response = await api.get(
        `/signup/log_in?users_id=${student_info_id}&password=${password}`,
        loginData
      );
      if (response.status === 200) {
        // alert("Login successfully!");
        setLoginStatus("200");
        localStorage.setItem('student_info_id',student_info_id);
        console.log('User id: ',localStorage.student_info_id);
        navigate('/homepage');
      } else {
        setLoginStatus(response.data.message)
        setErrors({ global: response.data.message });
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        // alert ข้อความจาก backend
        setLoginStatus(`Error: ${error.response.data.detail}`)
        // alert(`Error: ${error.response.data.detail}`);
      } else {
        alert("An error occurred during signup. Please try again.");
        setLoginStatus("An error occurred during signup. Please try again.")
      }
    }
  };

  // log in page
  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <div className="head-container">
          <img src={HeadPic} alt="Headpic" className="head-pic" />
        </div>

        <div className="login-container">
          <img src={LogoPic} alt="LogoPic" className="logo-pic" />

          <div className="input-box1">
            <input
              type="number"
              placeholder="Student ID"
              required
              value={student_info_id}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-box2">
            <input
              type="password"
              className="input-pwd"
              name="input-pwd"
              placeholder="Password"
              required
              value={password}
              minLength={8}
              maxLength={24}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="forgot">
            <p>
              Do not have an account?{" "}
              <Link to="/signup">Click here to sign up</Link>{" "}
            </p>
          </div>

          <button className="submit-btn" type="submit">
            Sign In
          </button>
          { loginStatus !== "" && loginStatus !== '200' ? <AlertPopup> {loginStatus} </AlertPopup> : ""}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
