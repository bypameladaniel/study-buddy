import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import logo from "../assets/logo.png";
import logoutIcon from "../assets/logout.png";
import "../styles/sidebar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNewSession = () => {
    navigate("/dashboard");
  };

  const handleMyLibrary = () => {
    navigate("/mylibrary");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={logo} alt="Logo" className="sidebar__logo" />
        <nav className="sidebar__nav">
          <button className="sidebar__button sidebar__new-session" onClick={handleNewSession}>+ New Session</button>
          <button className="sidebar__button" onClick={handleMyLibrary}>My Library</button>
          <button className="sidebar__button" onClick={handleProfile}>Profile</button>
        </nav>
      </div>
      <div className="sidebar__bottom">
          <button className="sidebar__button sidebar__logout" onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout Icon" className="sidebar__logout-icon" style={{ width: 20, height: 20, verticalAlign: 'middle', marginRight: 8 }} />
            Logout
          </button>
      </div>
    </div>
  );
};

export default Sidebar;
