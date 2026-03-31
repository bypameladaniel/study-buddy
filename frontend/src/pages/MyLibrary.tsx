import React from "react";
import Sidebar from "../components/layout/Sidebar";

const MyLibrary: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ padding: 40, textAlign: "center" }}></div>
      <h1>My Library</h1>
      <p>This is your library. Content coming soon!</p>
    </div>
  );
};

export default MyLibrary;
