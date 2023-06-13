import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import ProfileSummary from "../../components/ProfileSummary/ProfileSummary";
import TeamFinder from "../../components/TeamFinder/TeamFinder";
import { FeedCard } from "../../components/FeedCard/FeedCard";
import { useNavigate } from "react-router-dom";
import { TeamFinderCard } from "../../components/TeamFinder/TeamFinderCard";
import loader_img from "../../assets/images/loader.svg";
import codz_hero from "../../assets/codz-hero.png";
import landingIntro from "../../assets/landing-intro.png";
import searchimg from "../../assets/icons/search.svg";

import Axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  });
  const [modal, setModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [recall, setRecall] = useState(true);
  const [loader, setLoader] = useState(false);
  const user = JSON.parse(localStorage.getItem("user_info"));
  // console.log(user);
  useEffect(() => {
    Axios.get("https://devcom-production.onrender.com/getAllPosts").then(
      (res) => {
        console.log(res.data);
        setPosts(res.data.reverse());
      }
    );
    setRecall(!recall);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const getUserSpaces = async () => {
    const res = await Axios.post(
      `https://devcom-production.onrender.com/get-users-spaces`,
      {
        username: user.username,
      }
    );
    localStorage.setItem("user_spaces", JSON.stringify(res.data));
    console.log(res.data);
  };

  const searchFeed = () => {
    if (search === "") {
      setRecall(!recall);
      return;
    }
    console.log(search);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    setPosts(
      posts.filter((post) => {
        return post.skills.some((skill) => {
          return skill.toLowerCase().includes(search.toLowerCase());
        });
      })
    );
    setRecall(!recall);
  };

  useEffect(() => {
    getUserSpaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard" id={modal ? "blurr" : null}>
      <div className="dashboard-main">
        <div className="welcome-head">
          {user.fullname ? (
            <h1>Welcome, {user.fullname}</h1>
          ) : (
            <h1>Welcome, User</h1>
          )}
          <p>Find out what's new</p>
        </div>

        <TeamFinder setModal={setModal} />

        {modal && <TeamFinderCard setModal={setModal} />}

        <div className="feed-search">
          <h3>Feed Search</h3>
          <div className="inputbox">
            <div className="inputx">
              <img src={searchimg} alt="search" style={{ borderStyle: 'none', verticalAlign: 'middle' }} />
              <input
                type="text"
                placeholder="Type the skills you are looking for"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>            
            <div className="searchbtn" onClick={searchFeed}>
              Search
            </div>
          </div>
          <div className="intro-graphic">
            <img className="intro-right" src={landingIntro} alt="" />
          </div>
        </div>

        {loader ? (
          <img className="loader-img" src={loader_img} alt="Loading..." />
        ) : (
          posts.map((post, idx) => {
            return <FeedCard post={post} recall={recall} key={idx} />;
          })
        )}
      </div>

      <div className="dashboard-summary">
        <ProfileSummary />
      </div>
    </div>
  );
};

export default Dashboard;
