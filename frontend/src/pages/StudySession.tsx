import React from "react";
import ContinueStudyingSection from "../components/studySession/ContinueStudyingSection";
import StudySessionHeader from "../components/studySession/StudySessionHeader";
import GenerateStudySessionCard from "../components/studySession/GenerateStudySessionCard";
import Sidebar from "../components/layout/Sidebar";
import { StudySessionColors } from "../styles/colors";

const StudySession: React.FC = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.container}>
        <div style={styles.contentWrap}>
          <StudySessionHeader/>
          <GenerateStudySessionCard />
          <ContinueStudyingSection />
        </div>
      </div>
    </div>
  );
};

export default StudySession;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    paddingTop: "30px",
    paddingBottom: "30px",
    paddingLeft: "32px",
    paddingRight: "32px",
    backgroundColor: StudySessionColors.pageBackground,
    backgroundImage: `linear-gradient(180deg, ${StudySessionColors.pageGradientStart} 0%, ${StudySessionColors.pageGradientEnd} 100%)`,
    minHeight: "100vh",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    color: StudySessionColors.title,
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
  },
  contentWrap: {
    width: "100%",
    maxWidth: "min(1100px, 100%)",
    margin: "0 auto",
  },
};