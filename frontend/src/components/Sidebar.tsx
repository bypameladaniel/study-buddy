import React from "react";
import logo from "../assets/logo.png";
import "../styles/sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={logo} alt="Logo" className="sidebar__logo" />
        <nav className="sidebar__nav">
          <button className="sidebar__button sidebar__new-session">+ New Session</button>
          <button className="sidebar__button">My Library</button>
          <button className="sidebar__button">My Profile</button>
        </nav>
      </div>
      <div className="sidebar__bottom">
        <button className="sidebar__button sidebar__logout">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
