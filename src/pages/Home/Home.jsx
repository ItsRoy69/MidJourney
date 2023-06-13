import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'

import fullLogo from "../../assets/codz-full-logo.svg";
import playground from "../../assets/codz-playground.svg";
import playground_chat from "../../assets/codz-chat.svg";
import generation from "../../assets/generation.png";
import summarization from "../../assets/summarization.png";
import debugging from "../../assets/debugging.png";
import optimization from "../../assets/optimization.png";
import codz_hero from "../../assets/codz-hero.png";
import codz_grid from "../../assets/codz-grid.svg";
import land_grad from "../../assets/land-grad.png";
import landingIntro from "../../assets/landing-intro.png";
import glass_board from "../../assets/glass-hero.png";
import join_grad from "../../assets/join-grad.png";
import twitterLogo from "../../assets/twitter.svg";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="Landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <nav className="navbar">
        <div className="navbar-content">
          <img onClick={() => navigate("/")} src={fullLogo} alt="logo" />
          <div className="nav-links">
            <div onClick={() => navigate("/signin")}>Login</div>
            <a onClick={() => navigate("/signup")}>
              <div className="nav-btn">Signup</div>
            </a>
          </div>
        </div>
      </nav>
      {/* <img className='hero-left' src={landingHero} alt="" />
      <img className='hero-right' src={landingHero} alt="" /> */}
      <img className="hero-mid" src={land_grad} alt="gradient" />

      <section className="hero">
        <div className="hero-content">
          <img src={glass_board} alt="glass-board" className="glass-board" />

          <div className="title">
            <h1>DevCom</h1>
          </div>
          <br />
          <div className="sub-title">
            <p>
              Connect and Collaborate with Talented Developers for Hackathons
              and Projects!
            </p>
          </div>
          <div className="hero-btn" onClick={() => navigate("")}>
            Start Collaborating
          </div>
        </div>
      </section>

      <section className="intro">
        <div className="intro-content">
          <div className="intro-desc">
            <p className="intro-title">
              Introducing <span id="gradient">DevCom</span>
            </p>
            <p className="intro-sub-title">
              Our web application serves as a platform for developers seeking
              hackathons or projects. It facilitates connections between
              developers, allowing them to collaborate effectively. When in need
              of additional team members, users can rely on our app to find
              suitable developers. With our platform, you can streamline your
              search for talented individuals and foster a thriving development
              community.
            </p>
          </div>
          <div className="intro-graphic">
            <img className="intro-right" src={landingIntro} alt="" />
            <img src={codz_hero} alt="codz-logo" />
          </div>
        </div>
      </section>

      <section className="playground">
        <img className="playground-left" src={landingIntro} alt="" />
        <div className="playground-content">
          <div className="playground-graphic">
            <img src={playground} alt="Coding" className="playground-img" />
            <img src={playground_chat} alt="Chat" className="chat-img" />
          </div>
          <div className="playground-desc">
            <p className="playground-title">
              <span id="gradient">DevCom</span>-Find Your Team
            </p>
            <br />
            <p className="playground-sub-title">
              Discover talent and connect with like-minded developers at
              DevConnect! Our web application simplifies the search for
              hackathon partners and project collaborators. Find the right
              developer for your team with ease.
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-content">
          <p className="feature-title">
            Connect, Collaborate, Code: Unleash Your Project Potential
          </p>
          <br />

          <div className="card-con">
            <div className="feature-card">
              <img src={optimization} alt="optimization" />
              <br />
              <p className="card-title">SquadFinder</p>
              <p className="card-sub-title">
                Connect with like-minded individuals for collaborative projects
                and build your dream team.
              </p>
            </div>
            <div className="feature-card">
              <img src={generation} alt="generation" />
              <p className="card-title">Hackathon Hub</p>
              <p className="card-sub-title">
                Discover and participate in exciting hackathons to showcase your
                skills and innovation.
              </p>
            </div>
            <div className="feature-card">
              <img src={debugging} alt="debugging" />
              <p className="card-title">Developer's Digest</p>
              <p className="card-sub-title">
                Stay up-to-date with the latest news, trends, and updates in the
                world of development.
              </p>
            </div>
            <div className="feature-card">
              <img src={summarization} alt="summarization" />
              <p className="card-title">Chat</p>
              <p className="card-sub-title">
                Communicate with your team effortlessly, share files, and ideate
                in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="join">
        <img className="join-mid" src={join_grad} alt="gradient" />
        <div className="join-content">
          <img src={codz_hero} alt="logo" />
          {/* <img src={dotted_circle} alt="circle" /> */}
          <p className="join-title">
            Start your hacking journey with <span id="gradient">DevCom</span>{" "}
            today!
            {/* Unleash your ultimate coding powers using <span id='gradient'>Codz</span> today! */}
          </p>
          <div
            className="join-btn"
            onClick={() => {
              navigate("");
            }}
          >
            Sign Up
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <img src={codz_grid} alt="Grid" />
        </div>
      </footer>
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
    </motion.div>
  );
};

export default Home;
