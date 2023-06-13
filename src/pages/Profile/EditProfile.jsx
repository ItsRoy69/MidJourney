import React, { useState } from "react";
import "./EditProfile.css";

import { useNavigate } from "react-router-dom";
import Back_icon from "../../assets/icons/back.png";
import { AiOutlineEdit } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdInsertPhoto } from "react-icons/md";

import { UpdateUser } from "../../service/Api";
import { Chips } from "../../components/Chips/Chips";

export const EditProfile = () => {
  const user_info = JSON.parse(localStorage.getItem("user_info"));
  const navigate = useNavigate();
  const username = user_info._id;

  const [fullname, setFullname] = useState(user_info.fullname);
  const [profilePic, setProfilePic] = useState(
    user_info.profilePic ? user_info.profilePic : ""
  );
  const [coverPic, setCoverPic] = useState(
    user_info.coverPic ? user_info.coverPic : ""
  );
  const [github, setGithub] = useState(user_info.github);
  const [linkedIn, setLinkedin] = useState(user_info.linkedIn);
  const [institution, setInstitution] = useState(user_info.institution);
  const [collegeStream, setCollegeStream] = useState(user_info.collegeStream);
  const [collegeYear, setCollegeYear] = useState(user_info.collegeYear);
  const [about, setAbout] = useState(user_info.about);
  const [skills, setSkills] = useState(
    user_info.skills ? user_info.skills : []
  );
  const [achievements, setAchievements] = useState(
    user_info.achievements ? user_info.achievements : []
  );
  const [experiences, setExperiences] = useState(
    user_info.experiences ? user_info.experiences : []
  );
  const [projects, setProjects] = useState(
    user_info.projects ? user_info.projects : []
  );

  const obj = {
    fullname,
    profilePic,
    coverPic,
    github,
    linkedIn,
    institution,
    collegeStream,
    collegeYear,
    about,
    skills,
    achievements,
    experiences,
    projects,
  };

  function addSkill(e) {
    if (e.key === "Enter" || e.key === ",") {
      if (skills.indexOf(e.target.value) === -1) {
        setSkills([...skills, e.target.value]);
        e.target.value = "";
      }
    }
  }

  function addAchievement(e) {
    if (e.key === "Enter" || e.key === ",") {
      if (achievements.indexOf(e.target.value) === -1) {
        setAchievements([...achievements, e.target.value]);
        e.target.value = "";
      }
    }
  }

  function addExperience(e) {
    if (e.key === "Enter" || e.key === ",") {
      if (experiences.indexOf(e.target.value) === -1) {
        setExperiences([...experiences, e.target.value]);
        e.target.value = "";
      }
    }
  }

  function addProject(e) {
    if (e.key === "Enter" || e.key === ",") {
      if (projects.indexOf(e.target.value) === -1) {
        setProjects([...projects, e.target.value]);
        e.target.value = "";
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = await UpdateUser(username, obj);
    console.log(submission);
    if (submission.data.success === true) {
      alert("Profile Updated");
      navigate("/profile");
    } else {
      alert("Error");
    }
  };

  const deleteSkill = (idx) => {
    console.log("Deleted Skill");
    const newSkills = skills.filter((skill) => skill !== idx);
    setSkills(newSkills);
  };

  const deleteAchievement = (idx) => {
    console.log("Deleted Achievement");
    const newAchievements = achievements.filter(
      (achievement) => achievement !== idx
    );
    setAchievements(newAchievements);
  };

  const deleteExperience = (idx) => {
    console.log("Deleted Experience");
    const newExperiences = experiences.filter(
      (experience) => experience !== idx
    );
    setAchievements(newExperiences);
  };

  const deleteProject = (idx) => {
    console.log("Deleted Project");
    const newProjects = projects.filter((project) => project !== idx);
    setProjects(newProjects);
  };

  return (
    <div className="editprofile">
      <div className="editprofileheader">
        <div
          className="editprofileheadcontent"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <h1>Profile Edit</h1>{" "}
          <AiOutlineEdit size={30} style={{ paddingTop: "20px" }} />
        </div>

        <div
          className="editprofileback"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <img src={Back_icon} alt="Back" />
        </div>
      </div>

      <p>Add your details here!</p>
      <div className="editprofilecontent">
        <div className="editprofilesec">
          <div className="edit-fullname">
            <div className="githublogo">
              <label>Name</label>
            </div>

            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="edit-github">
            <div className="githublogo">
              <label>GitHub</label>
              <FaGithubSquare size={25} />
            </div>

            <input
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div className="edit-linkedIn">
            <div className="githublogo">
              <label>LinkedIn</label>
              <AiFillLinkedin size={25} />
            </div>

            <input
              type="text"
              value={linkedIn}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className="edit-profimage">
            <div className="githublogo">
              <label>Profile Image URL</label>
              <BsPersonFill size={25} />
            </div>

            <input
              type="text"
              value={profilePic}
              onChange={(e) => {
                setProfilePic(e.target.value);
              }}
            />
          </div>
          <div className="edit-covimage">
            <div className="githublogo">
              <label>Cover Image URL</label>
              <MdInsertPhoto size={25} />
            </div>

            <input
              type="text"
              value={coverPic}
              onChange={(e) => {
                setCoverPic(e.target.value);
              }}
            />
          </div>
          <div className="edit-institution">
            <div className="githublogo">
              <label>Instituition</label>
            </div>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
          <div className="edit-collegeStream">
            <div className="githublogo">
              <label>College Stream</label>
            </div>
            <input
              type="text"
              value={collegeStream}
              onChange={(e) => setCollegeStream(e.target.value)}
            />
          </div>
          <div className="edit-collegeYear">
            <div className="githublogo">
              <label>College Year</label>
            </div>
            <input
              type="text"
              value={collegeYear}
              onChange={(e) => setCollegeYear(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-about">
          <div className="githublogo">
            <label>About</label>
          </div>

          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        <div className="editprofilesec2">
          <div className="edit-skills">
            <div className="githublogo">
              <label>Skills</label>
            </div>
            <input
              type="text"
              onKeyDown={(e) => {
                addSkill(e);
              }}
            />
          </div>
          <div className="skill-body">
            {skills.map((skill, idx) => {
              return (
                <div onClick={() => deleteSkill(skill)}>
                  <Chips name={skill} key={idx} />
                </div>
              );
            })}
          </div>

          <p
            className="teamfinderinputs"
            style={{ color: "#306BFF", paddingBottom: "20px" }}
          >
            (Enter skill & press ',' button for saving the skills. To delete
            click on the specific skills)
          </p>
        </div>

        <div className="edit-achievements">
          <div className="githublogo">
            <label>Achievements</label>
            <FaMedal size={25} />
          </div>

          <input
            type="text"
            onKeyDown={(e) => {
              addAchievement(e);
            }}
          />
          {achievements.map((achievement, idx) => {
            return (
              <ul className="editlists">
                <li
                  className="editlisted"
                  key={idx}
                  onClick={() => deleteAchievement(achievement)}
                >
                  <p>{achievement}</p>
                </li>
              </ul>
            );
          })}
          <p
            className="teamfinderinputs"
            style={{ color: "#306BFF", paddingBottom: "20px" }}
          >
            (Enter achievement & press 'Enter' button for saving the
            achievements. To delete click on the specific achievements)
          </p>
        </div>

        <div className="edit-experience">
          <div className="githublogo">
            <label>Experience</label>
            <MdWork size={25} />
          </div>
          <input
            type="text"
            onKeyDown={(e) => {
              addExperience(e);
            }}
          />
          {experiences.map((experience, idx) => {
            return (
              <ul className="editlists">
                <li
                  className="editlisted"
                  key={idx}
                  onClick={() => deleteExperience(experience)}
                >
                  {experience}
                </li>
              </ul>
            );
          })}
          <p
            className="teamfinderinputs"
            style={{ color: "#306BFF", paddingBottom: "20px" }}
          >
            (Enter experience & press 'Enter' button for saving the experiences.
            To delete click on the specific experiences)
          </p>
        </div>
        <div className="edit-projects">
          <div className="githublogo">
            <label>Projects</label>
            <AiOutlineFundProjectionScreen size={25} />
          </div>

          <input
            type="text"
            onKeyDown={(e) => {
              addProject(e);
            }}
          />
          {projects.map((project, idx) => {
            return (
              <ul className="editlists">
                <li
                  className="editlisted"
                  key={idx}
                  onClick={() => deleteProject(project)}
                >
                  {project}
                </li>
              </ul>
            );
          })}
          <p
            className="teamfinderinputs"
            style={{ color: "#306BFF", paddingBottom: "20px" }}
          >
            (Enter project & press 'Enter' button for saving the projects.
            To delete click on the specific projects)
          </p>
        </div>
      </div>
      <div onClick={handleSubmit} className="edit-submit-btn">
        Save Changes
      </div>
    </div>
  );
};
