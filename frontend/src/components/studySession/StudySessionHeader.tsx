import React from "react";
import { StudySessionColors } from "../../styles/colors";

const StudySessionHeader: React.FC = () => {
  return (
    <header style={styles.wrap}>
      <h1 style={styles.title}>Study Session</h1>
      <p style={styles.tagline}>Create a study session</p>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrap: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    margin: 0,
    marginBottom: 8,
    color: StudySessionColors.title,
    textAlign: "left",
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  tagline: {
    margin: 0,
    fontSize: 16,
    color: StudySessionColors.subtitle,
    lineHeight: 1.5,
    maxWidth: 480,
  },
};

export default StudySessionHeader;
