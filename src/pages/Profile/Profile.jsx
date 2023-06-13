import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import avatar_pic from "../../assets/images/avatar2.png";
import cover_pic from "../../assets/images/cover.jpg";
import github from "../../assets/icons/github.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import { Chips } from "../../components/Chips/Chips";
import { Backdrop } from "../../components/Backdrop/Backdrop";

const Profile = () => {
  const username = JSON.parse(localStorage.getItem("user_info")).username;
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [profileModal, setProfileModal] = useState(false);
  const [coverModal, setCoverModal] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);

  const handleClick1 = () => {
    setShowAlert1(true);
  };

  const handleClick2 = () => {
    setShowAlert2(true);
  };

  const handleProfileChange = (e) => {
    if (e.target.files[0]) {
      setProfileImg(e.target.files[0]);
    }
  };

  const storage = getStorage();

  const handleProfileUpload = () => {
    const storageRef = ref(storage, `profileImages/${profileImg.name}`);
    setLoader(true);
    uploadBytes(storageRef, profileImg).then((snapshot) => {
      if (snapshot) {
        console.log(snapshot);
        setLoader(false);
        alert("Profile Picture Changed Successfully!");
        getDownloadURL(ref(storage, `profileImages/${profileImg.name}`)).then(
          (url) => {
            Axios.patch(
              `https://devcom-production.onrender.com/updateUser/${user._id}`,
              {
                profilePic: url,
              }
            )
              .then((res) => {
                console.log(res);
                window.location.reload(true);
              })
              .catch((e) => {
                console.log(`Could not save image Url. ${e}`);
              });
          }
        );
      }
    });
  };

  const handleCoverChange = (e) => {
    if (e.target.files[0]) {
      setCoverImg(e.target.files[0]);
    }
  };

  const handleCoverUpload = () => {
    const storageRef = ref(storage, `coverImages/${coverImg.name}`);
    setLoader(true);
    uploadBytes(storageRef, coverImg).then((snapshot) => {
      if (snapshot) {
        console.log(snapshot);
        setLoader(false);
        alert("Cover Picture Changed Successfully!");
        getDownloadURL(ref(storage, `coverImages/${coverImg.name}`)).then(
          (url) => {
            Axios.patch(
              `https://devcom-production.onrender.com/updateUser/${user._id}`,
              {
                coverPic: url,
              }
            )
              .then((res) => {
                console.log(res);
                window.location.reload(true);
              })
              .catch((e) => {
                console.log(`Could not save image Url. ${e}`);
              });
          }
        );
      }
    });
  };

  useEffect(() => {
    console.log(username);
    const setUserDetails = async () => {
      const res = await Axios.post(
        "https://devcom-production.onrender.com/getUser",
        {
          username: username,
        }
      );
      console.log(res.data);
      setUser(res.data);
      localStorage.setItem("user_info", JSON.stringify(res.data));
    };
    setUserDetails();
  }, []);

  return (
    <div className="profile">
      <div className="profileedit">
        <h1>My Profile</h1>
        <div
          className="profileeditbtn"
          onClick={() => {
            navigate("/profile/edit");
          }}
        >
          Edit Profile
        </div>
      </div>

      <div className="profile-banner">
        <div className="profile-header">
          <div className="profile-cimg">
            <img
              className="coverpic"
              src={user.coverPic ? user.coverPic : cover_pic}
              alt="Cover Picture"
            />
            <span onClick={() => setCoverModal(true)}>
              <FontAwesomeIcon className="pencilicon" icon={faPenToSquare} />
            </span>
          </div>
          <div className="profile-details">
            <div className="profileleft">
              <div className="profile-img">
                <img
                  src={user.profilePic ? user.profilePic : avatar_pic}
                  alt="avatar"
                  className="avatar"
                />
                <span
                  onClick={() => setProfileModal(true)}
                  className="pencilicon2"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="light" />
                </span>
              </div>
              <div className="profiletxt">
                <p className="profilename">
                  {user.fullname ? user.fullname : "Jyotirmoy Roy"}
                </p>
                <p className="profileposition">Developer</p>
                <p className="profileinstitution">
                  {user.collegeStream
                    ? user.collegeStream
                    : "Bachelor's Degree"}{" "}
                  student at{" "}
                  {user.institution ? user.institution : "UEM Kolkata"},{" "}
                  {user.collegeYear ? user.collegeYear : "3"}rd Year
                </p>
              </div>
            </div>
            <div className="profilesocials">
              <div className="socialgit">
                {user.github ? (
                  <img
                    src={github}
                    alt="GitHub"
                    onClick={() => window.open(user.github, "_blank")}
                  />
                ) : (
                  <div>
                    {showAlert1 && (
                      <div className="bgalert">
                        <motion.div
                          className="alertbox"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="linkalert">
                            <h2>Add your Github account please !!!</h2>
                            <div
                              className="profileeditbtn"
                              onClick={() => setShowAlert1(false)}
                              style={{ textAlign: "center" }}
                            >
                              Okay
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                    <img src={github} alt="LinkedIn" onClick={handleClick1} />
                  </div>
                )}
              </div>

              <div className="sociallink">
                {user.linkedIn ? (
                  <img
                    src={linkedin}
                    alt="LinkedIn"
                    onClick={() => window.open(user.linkedIn, "_blank")}
                  />
                ) : (
                  <div>
                    {showAlert2 && (
                      <div className="bgalert">
                        <motion.div
                          className="alertbox"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="linkalert">
                            <h2>Add your LinkedIn account please !!!</h2>
                            <div
                              className="profileeditbtn"
                              onClick={() => setShowAlert2(false)}
                              style={{ textAlign: "center" }}
                            >
                              Okay
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                    <img src={linkedin} alt="LinkedIn" onClick={handleClick2} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="profileskills">
          <h2>Skills</h2>
          <div className="profileskillssub">
            {user.skills && user.skills.length > 0 ? (
              <div className="skill-sub">
                {user.skills.map((skill, idx) => (
                  <Chips
                    className="profilechipscontent"
                    name={skill}
                    key={idx}
                  />
                ))}
              </div>
            ) : (
              <p>You haven't added any skills yet</p>
            )}
          </div>
        </div>

        <div className="profileabout">
          <h2>About</h2>
          {user.about ? (
            <div className="profileaboutcard">
              <p>{user.about}</p>
            </div>
          ) : (
            "You haven't added any about me yet"
          )}
        </div>

        <div className="profileachievements">
          <h2>Achievements</h2>
          {user.achievements && user.achievements.length > 0 ? (
            <div className="profileachievementscard">
              <ul>
                {user.achievements.map((achievement, idx) => {
                  return <li key={idx}>{achievement}</li>;
                })}
              </ul>
            </div>
          ) : (
            "You haven't added any achievements yet"
          )}
        </div>

        <div className="profileexperience">
          <h2>Experience</h2>
          {user.experiences && user.experiences.length > 0 ? (
            <div className="profileexperiencecard">
              <ul>
                {user.experiences.map((experience, idx) => {
                  return <li key={idx}>{experience}</li>;
                })}
              </ul>
            </div>
          ) : (
            "You haven't added any experience yet!"
          )}
        </div>

        <div className="profileprojects">
          <h2>Projects</h2>
          {user.projects ? (
            <div className="profileprojectssub">
              {user.projects.map((project, idx) => {
                return (
                  <div className="profileprojectcard" key={idx}>
                    <p>{project}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            "You haven't added any projects yet"
          )}
        </div>
      </div>

      {profileModal ? (
        <Backdrop onClick={() => setProfileModal(false)}>
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="profilepicedit">
              <div className="profilepicedithead">
                <input type="file" onChange={handleProfileChange}></input>
                {loader ? <div class="loader"></div> : null}
              </div>
              <div className="profilepiceditbtn">
                <div type="submit" id="sb" onClick={handleProfileUpload}>
                  Submit
                </div>
              </div>
            </div>
          </motion.div>
        </Backdrop>
      ) : null}

      {coverModal ? (
        <>
          <Backdrop onClick={() => setCoverModal(false)}>
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="profilepicedit">
                <div className="profilepicedithead">
                  <input type="file" onChange={handleCoverChange}></input>
                  {loader ? <div class="loader"></div> : null}
                </div>
                <div className="profilepiceditbtn">
                  <div type="submit" id="sb" onClick={handleCoverUpload}>
                    Submit
                  </div>
                </div>
              </div>
            </motion.div>
          </Backdrop>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
