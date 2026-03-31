import React from "react";
import Sidebar from "../components/layout/Sidebar";

const Profile: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ padding: 40, textAlign: "center" }}></div>
      <h1>Profile</h1>
      <p>This is your profile page. Content coming soon!</p>
    </div>
  );
};

export default Profile;
