import React, { useEffect } from 'react'
import "./teamFinderCard.css";
// import Skills from "./finder_skill"
import years from './finder_year';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Backdrop } from '../Backdrop/Backdrop'
import { PostFeed } from '../../service/Api';
import { Chips } from '../Chips/Chips';
import land_grad from "../../assets/land-grad.png";

export const TeamFinderCard = ({ setModal }) => {
  const user = JSON.parse(localStorage.getItem("user_info"));
  const [selectedYear, setSelectedYear] = useState("");

  const [details, setDetails] = useState({
    name: user.fullname,
    username: user.username,
    title: "",
    email: "",
    skills: [],
    year: "",
    date: new Date()
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = await PostFeed(details);
    console.log(submission);

    if (submission.data.success === true) {
      setModal(false);
    } else {
      alert("Error");
    }
  }

  function addSkill(e) {
    if (e.key === ',') {
      if (details.skills.indexOf(e.target.value) === -1) {
        setDetails({ ...details, skills: [...details.skills, e.target.value] });
        e.target.value = "";
      }
    }
  }

  const deleteSkill = (idx) => {
    console.log("Deleted Skill");
    //delete index idx from skills
    const newSkills = details.skills.filter((skill) => skill !== idx);
    setDetails({ ...details, skills: newSkills });
  };

  useEffect(() => {
    console.log(details);
  }, [details]);


  return (
    <Backdrop onClick={() => setModal(false)}>
      <motion.div onClick={(e) => { e.stopPropagation() }}>
        
          <div className='teamfindercardbody'>
            <img className="teamfindercardbg" src={land_grad} alt="gradient" />
            <div className="teamfindercontent">
              <h1>Find a teammate</h1>
              <form action="" className='teamfinderform'>   
                <div className="teamfinderinputs">
                  <h4>Title{" "} : {" "}</h4>           
                  <div className="inputbox">
                    <input name="title" placeholder='Role You Searching For' type="text" value={details.title} onChange={handleChange} required />
                  </div>
                </div>
                <div className="teamfinderinputs">
                  <h4>Email{" "} : {" "}</h4>           
                  <div className="inputbox">
                    <input name="email" placeholder='Enter your email' type="email" value={details.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="teamfinderskills">  
                  <div className="teamfinderskillhead">
                    <h4>Skills{" "} : {" "}</h4>         
                    <div className="inputbox">
                      <input name="skill" placeholder='Enter the skill you are looking for' type="text" onKeyDown={(e) => { addSkill(e); }} required />
                    </div>
                  </div>                  
                  
                    <div className="skill-body">
                      {details.skills.map((item, idx) => {
                        return (
                          <div onClick={() => deleteSkill(item)} key={idx}>
                            <Chips name={item} />
                          </div>
                        )
                      })}
                    </div>
                  
                  <p className="teamfinderinputs" style={{color: "#306BFF", paddingBottom: "20px"}}>(Enter skill & press ',' button for saving the skills. To delete click on the specific skills)</p>
                </div>

              <div className="teamfinderyear">
                <h4>Year of Education <span style={{ color: "gray" }}>(Optional)</span></h4>
                <div className="skill-body">
                  {years.map((item, idx) => {
                    return (
                      <div className='skill-box' id={selectedYear === item.name ? "year-selected" : ""} key={idx} onClick={() => { setDetails({ ...details, year: item.name }); setSelectedYear(item.name) }}>
                        <b>{item.name}</b>
                      </div>
                    )
                  })}
                </div>
              </div>

            </form>
            <div className='teamfindersubmit'>
              <div type="submit" id='sb' onClick={handleSubmit} className='teamsubmit'>Submit</div>
            </div>
            </div>
          </div>
      </motion.div>
    </Backdrop>

  )
}

export default TeamFinderCard