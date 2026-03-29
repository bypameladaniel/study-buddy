import React from "react";
import { dashboardColors } from "../../styles/colors";

const StudyCard: React.FC = () => {
  return (
    // mock text, to be replaced 
    <button
      type="button"
      style={styles.studyCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = styles.studyCard.boxShadow!;
      }}
    >
      <p style={styles.studyTitle}>
        SOEN 357 - Lecture 4: UX Design Process
      </p>
      <p style={styles.studySubtitle}>Last accessed: Today</p>
    </button>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  studyCard: {
    flex: 1,
    width: "100%",
    backgroundColor: dashboardColors.studyCardBackground,
    border: `2px solid ${dashboardColors.studyCardBorder}`,
    padding: "18px",
    borderRadius: "14px",
    textAlign: "left",
    cursor: "pointer",
    font: "inherit",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  },
  studyTitle: {
    fontSize: "18px",
    marginBottom: "8px",
    color: dashboardColors.studyTitle,
    fontWeight: 600,
  },
  studySubtitle: {
    fontSize: "13px",
    color: dashboardColors.studySubtitle,
  },
};

export default StudyCard;
