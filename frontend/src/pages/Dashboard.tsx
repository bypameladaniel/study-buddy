import React from "react";
import ContinueStudyingSection from "../components/dashboard/ContinueStudyingSection";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import GenerateStudySessionCard from "../components/dashboard/GenerateStudySessionCard";
import { dashboardColors } from "../styles/colors";

const Dashboard: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.contentWrap}>
        <DashboardHeader />
        <GenerateStudySessionCard />
        <ContinueStudyingSection />
      </div>
    </div>
  );
};

export default Dashboard;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "clamp(24px, 6vw, 88px)",
    paddingRight: "clamp(24px, 6vw, 88px)",
    backgroundColor: dashboardColors.pageBackground,
    backgroundImage: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)`,
    minHeight: "100vh",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    color: dashboardColors.title,
  },
  contentWrap: {
    width: "100%",
    maxWidth: "1040px",
    margin: "0 auto",
  },
};