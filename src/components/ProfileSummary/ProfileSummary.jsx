import React from "react";
import "./ProfileSummary.css";
import profile_pic from "../../assets/images/avatar2.png";
import peer from "../../assets/icons/peer.svg";
import writePost from "../../assets/icons/writePost.svg";

const ProfileSummary = () => {
  const user = JSON.parse(localStorage.getItem("user_info"));
  const userspaces = JSON.parse(localStorage.getItem("user_spaces"));

  return (

    <div className="profile">
      <div className="profile-summary">
        <h1>Profile</h1>
        <img
          src={user.profilePic ? user.profilePic : profile_pic}
          alt="avatar"
          className="profile-pic"
        />
        <p className="username">{user.fullname}</p>
        {user.title ? (
          <p className="title">{user.title}</p>
        ) : (
          <p className="title">Developer</p>
        )}
      </div>

      <div className="profile-stats">
        <div className="profile-card">
          <img src={peer} alt="Peers" className="profileicon" />
          <div className="profilestats">
            <p className="profilecount">{userspaces ? userspaces.length : 0}</p>
            <p className="profilecount-sub">Peers</p>
          </div>
        </div>
        <div className="profile-card">
          <img src={writePost} alt="Posts" className="profileicon" />
          <div className="profilestats">
            <p className="profilecount">{user.posts}</p>
            <p className="profilecount-sub">Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
