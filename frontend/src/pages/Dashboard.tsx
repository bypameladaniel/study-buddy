import React from "react";
import ContinueStudyingSection from "../components/dashboard/ContinueStudyingSection";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import GenerateStudySessionCard from "../components/dashboard/GenerateStudySessionCard";
import Sidebar from "../components/Sidebar";
import { dashboardColors } from "../styles/colors";

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.container}>
        <div style={styles.contentWrap}>
          <DashboardHeader />
          <GenerateStudySessionCard />
          <ContinueStudyingSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "32px",
    paddingRight: "32px",
    backgroundColor: dashboardColors.pageBackground,
    backgroundImage: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)`,
    minHeight: "100vh",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    color: dashboardColors.title,
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
  },
  contentWrap: {
    width: "100%",
    maxWidth: "min(1300px, 100%)",
    margin: "0 auto",  
  },
};