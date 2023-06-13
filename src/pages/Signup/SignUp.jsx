import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { RegisterUser } from "../../service/Api";
import "./SignUp.css";

import fullLogo from "../../assets/codz-full-logo.svg";
import { Container } from "@mantine/core";
import codzLogo from "../../assets/codz-hero.png";
import loginCard from "../../assets/login-card.png";
import loginLeft from "../../assets/login-left.png";
import loginRight from "../../assets/login-right.png";
import { motion } from "framer-motion";
import twitterLogo from "../../assets/twitter.svg";

const SignUp = () => {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      alert("Passwords do not match!");
    } else {
      const reg = await RegisterUser(credentials);
      console.log(reg);
      if (reg.data.exists === true) {
        alert("USER ALREADY EXISTS !! ");
        navigate("/signin");
      }

      if (reg.data.sucess === true) {
        alert("USER CREATED !! ");
        navigate("/");
      }

      if (reg.data.sucess === false && reg.data.exists !== true) {
        alert("ERROR");
        setcredentials({
          fullname: "",
          username: "",
          email: "",
          password: "",
          cpassword: "",
        });
      }
    }
  };

  return (

    <motion.div
      className="Register"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <nav className="navbar">
        <div className="navbar-content">
          <img onClick={() => navigate("/")} src={fullLogo} alt="logo" />
          <div className="nav-links">
            <div onClick={() => navigate("/")}>Home</div>
            <a onClick={() => navigate("/signin")}>
              <div className="nav-btn">Login</div>
            </a>
          </div>
        </div>
      </nav>
      <img src={loginLeft} className="login-left" alt="gradient" />
      <img src={loginCard} className="login-center" alt="gradient" />
      <img src={loginRight} className="login-right" alt="gradient" />

      <Container size={1200}>
        <div className="auth-con">
          <div className="auth-title">
            <p>
              Register to <span id="gradient">DevCom</span>
            </p>
          </div>

          <div className="auth-card">
            <img src={codzLogo} alt="Codz Logo" className="codzlogo" />
            <p className="heading">Create an account</p>
            <p className="sub-heading">
              Find your perfect project partner, build projects together,
              discover hackathons and much more!
            </p>
            <br />

            <button className="gbtn">
              <FcGoogle />
              Register with Google
            </button>

            <form className="auth-inp" action="">
              <div className="inp-box">
                <input
                  name="fullname"
                  type="text"
                  placeholder="Name"
                  value={credentials.fullname}
                  onChange={handleChange}
                />
              </div>

              <div className="inp-box">
                <input
                  name="username"
                  type="text"
                  placeholder="User Name"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>

              <div className="inp-box">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="inp-box">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  autoComplete="password"
                />
              </div>

              <div className="inp-box">
                <input
                  name="cpassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={credentials.cpassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>

              <div className="auth-btn nav-btn" onClick={handleSignup}>
                Register
              </div>
            </form>

            <p className="auth-link">
              Already have an account?{" "}
              <a onClick={() => navigate("/")}>Login</a>
            </p>
          </div>
        </div>
        <div className="Footer">
          <div className="footer-con">
            <div className="logo-box">
              <img src={fullLogo} alt="" />
            </div>
            <p>©2023 DevCom</p>
            <div className="socials-con">
              {/* <a href="" className='join-link' target="_blank" rel='noreferrer'><img className='disc' src={githubLogo} alt="GitHub" /></a> */}
              <a
                href="https://twitter.com/itsmeroy69"
                className="join-link"
                target="_blank"
                rel="noreferrer"
              >
                <img className="disc" src={twitterLogo} alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default SignUp;
