import React from "react";
import { dashboardColors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import type { StudySession } from "../../types/session";
import { formatLastAccessed } from "../../utils/sessionStorage";

interface StudyCardProps {
  session: StudySession;
}

const StudyCard: React.FC<StudyCardProps> = ({ session }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/study-workspace", { state: { sessionId: session.id } });
  };

  return (
    <button
      type="button"
      style={styles.studyCard}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = styles.studyCard.boxShadow!;
      }}
    >
      <p style={styles.studyTitle}>{session.title}</p>
      <p style={styles.studySubtitle}>
        Last accessed: {formatLastAccessed(session.lastAccessedAt)}
      </p>
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
