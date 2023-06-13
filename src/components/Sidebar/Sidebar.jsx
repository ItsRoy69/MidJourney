import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logout_logo from "../../assets/icons/logout.png";
import hamburger_logo from "../../assets/icons/hamburger.png";
import fullLogo from "../../assets/codz-full-logo.svg";
import routes from "./sidebar_routes";
import "./Sidebar.css";

const Sidebar = ({ children, setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("user_spaces");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="sidebar-main">
      <motion.div
        animate={{ width: isOpen ? "14%" : "4%" }}
        className="sidebar"
      >
        <div className="sidebar_top" onClick={sidebarToggle}>
          {isOpen && (
            <img src={fullLogo} alt="logo" className="dashboardlogo" />
          )}
          <img src={hamburger_logo} alt="hamburger" className="hamlogo" />
        </div>

        <div className="sidebar_mid">
          {routes.map((route) => {
            return (
              <Link to={route.path} key={route.name}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.9 }}
                  className="sidebar_links"
                >
                  <img
                    src={route.icon}
                    alt={route.name}
                    className="sidebarlink_icon"
                  />
                  {isOpen && <p className="sidebarlink_text">{route.name}</p>}
                </motion.div>
              </Link>
            );
          })}
        </div>
        <div className="sidebar_bottom" onClick={handleLogout}>
          <img src={logout_logo} alt="logout" />
          {isOpen && <p>Logout</p>}
        </div>
      </motion.div>
      {/* This main will render the individual pages */}
      <main className="dashcontent">{children}</main>
    </div>
  );
};

export default Sidebar;
