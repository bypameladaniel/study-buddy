import React from "react";
import { StudySessionColors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import type { StudySession } from "../../types/session";
import { formatLastAccessed } from "../../utils/sessionStorage";

interface StudyCardProps {
  session: StudySession;
  onDelete?: (id: string) => void;
}

const StudyCard: React.FC<StudyCardProps> = ({ session, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/study-workspace", { state: { sessionId: session.id } });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!onDelete) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this session?",
    );
    if (confirmed) {
      onDelete(session.id);
    }
  };

  return (
    <div
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
      <div
        role="button"
        tabIndex={0}
        style={styles.cardContent}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
      >
        <p style={styles.studyTitle}>{session.title}</p>
        <p style={styles.studySubtitle}>
          Last accessed · {formatLastAccessed(session.lastAccessedAt)}
        </p>
      </div>

      {onDelete && (
        <button
          type="button"
          style={styles.deleteButton}
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
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
    justifyContent: "space-between",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    boxShadow: StudySessionColors.shadowSm,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  cardContent: {
    cursor: "pointer",
    outline: "none",
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

  deleteButton: {
  alignSelf: "flex-end",
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#e85d75",
  color: "#fff",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  opacity: 0.8,
}
};

export default StudyCard;
