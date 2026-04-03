import React from "react";
import { StudySessionColors } from "../../styles/colors";

const StudyCard: React.FC = () => {
  return (
    <button
      type="button"
      style={styles.studyCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = StudySessionColors.shadowLg;
        e.currentTarget.style.borderColor = "#7eb5ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = StudySessionColors.shadowSm;
        e.currentTarget.style.borderColor = StudySessionColors.studyCardBorder;
      }}
    >
      <p style={styles.studyTitle}>SOEN 357 — Lecture 4: UX design process</p>
      <p style={styles.studySubtitle}>Last accessed · Today</p>
    </button>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  studyCard: {
    flex: "1 1 260px",
    minWidth: 0,
    width: "100%",
    maxWidth: "100%",
    backgroundColor: StudySessionColors.studyCardBackground,
    border: `1px solid ${StudySessionColors.studyCardBorder}`,
    padding: "20px 18px",
    borderRadius: 14,
    textAlign: "left",
    cursor: "pointer",
    font: "inherit",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    boxShadow: StudySessionColors.shadowSm,
  },
  studyTitle: {
    fontSize: 17,
    margin: "0 0 8px 0",
    color: StudySessionColors.studyTitle,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    lineHeight: 1.35,
  },
  studySubtitle: {
    fontSize: 13,
    margin: 0,
    color: StudySessionColors.studySubtitle,
  },
};

export default StudyCard;
