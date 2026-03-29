import React from "react";
import { dashboardColors } from "../../styles/colors";
import StudyCard from "./StudyCard";

const ContinueStudyingSection: React.FC = () => {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Continue Studying</h2>
      <p style={styles.subtitle}>Recently accessed workspaces</p>

      <div style={styles.cardGrid}>
        <StudyCard />
        <StudyCard />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "23px",
    marginBottom: "10px",
    color: dashboardColors.sectionTitle,
  },
  subtitle: {
    fontSize: "14px",
    color: dashboardColors.subtitle,
    marginBottom: "15px",
  },
  cardGrid: {
    display: "flex",
    gap: "20px",
  },
};

export default ContinueStudyingSection;
