import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithGoogle } from "../../Firebase";
import { LoginUser } from '../../service/Api';
import { Axios } from "axios";
import "./SignIn.css";

import fullLogo from "../../assets/codz-full-logo.svg";
import { Container } from "@mantine/core";
import codzLogo from "../../assets/codz-hero.png";
import loginCard from "../../assets/login-card.png";
import loginLeft from "../../assets/login-left.png";
import loginRight from "../../assets/login-right.png";
import { motion } from "framer-motion";
import twitterLogo from "../../assets/twitter.svg";

const SignIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (credentials.password.length < 5) {
      alert("Passwords needs to be greater than 5 characters !! ");
    } else {
      const reg = await LoginUser(credentials);
      console.log(reg);
      if (reg.data.sucess === true) {
        alert("USER LOGGED IN !! ");
        localStorage.setItem("token", reg.data.token);
        localStorage.setItem("user_info", JSON.stringify(reg.data.user));
        setIsLoggedIn(true);
        navigate("/");
      }

      if (reg.data.sucess === false) {
        alert("Invalid Credentials!! ");
        navigate("/signin");
      }
    }
  };

  return (
    <motion.div
      className="Login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <nav className="navbar">
        <div className="navbar-content">
          <img onClick={() => navigate("/")} src={fullLogo} alt="logo" />
          <div className="nav-links">
            <div onClick={() => navigate("/")}>Home</div>
            <a onClick={() => navigate("/signup")}>
              <div className="nav-btn">Signup</div>
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
              Login to <span id="gradient">DevCom</span>
            </p>
          </div>

          <div className="auth-card">
            <img src={codzLogo} alt="Codz Logo" className="codzlogo" />
            <p className="heading">Welcome back</p>
            <br />

            <button className="gbtn" onClick={signInWithGoogle}><FcGoogle />{" "}Login with Google{" "}</button>

            <form className="auth-inp" action="">
              <div className="inp-box">
                <input name="email" placeholder="Email" type="email" value={credentials.email} onChange={handleChange} />
              </div>

              <div className="inp-box">
                <input name="password" autoComplete="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
              </div>
            </form>

            <div className="auth-btn nav-btn" onClick={handleSignin}>
              Signin
            </div>

            <p className="auth-link">
              Don't have an account?{" "}
              <a onClick={() => navigate("/signup")}>Sign Up</a>
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

export default SignIn;
