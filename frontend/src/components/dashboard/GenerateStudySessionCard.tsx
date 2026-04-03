import React, { useState } from "react";
import { dashboardColors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";

const GenerateStudySessionCard: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleUpload = () => {
    if (!text.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    navigate("/study-workspace", {
      state: {
        studyMaterial: text,
        sessionTitle: sessionName || "Untitled Session",
      },
    });
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>Generate new study session</h2>
      <p style={styles.lead}>
        Name your session, paste your notes or reading, then upload to open the workspace.
      </p>

      <label htmlFor="session-name" style={styles.label}>
        Session name
      </label>
      <input
        id="session-name"
        type="text"
        placeholder="e.g. BIO 101 — Week 3"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        style={styles.input}
      />

      <label htmlFor="session-content" style={styles.label}>
        Study material
      </label>
      <textarea
        id="session-content"
        placeholder="Paste your academic content here (text only)"
        style={styles.textarea}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (showError) setShowError(false);
        }}
      />
      {showError && !text.trim() && (
        <p style={styles.errorText}>Add some content before continuing.</p>
      )}

      <div style={styles.uploadContainer}>
        <button
          type="button"
          style={styles.uploadButton}
          onClick={handleUpload}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = dashboardColors.uploadButtonHover;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = dashboardColors.uploadButtonBackground;
          }}
        >
          Open workspace
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: dashboardColors.cardBackground,
    border: `1px solid ${dashboardColors.cardBorder}`,
    padding: "28px 28px 24px",
    borderRadius: 16,
    marginBottom: 36,
    boxShadow: dashboardColors.shadowLg,
  },
  sectionTitle: {
    fontSize: "1.35rem",
    margin: 0,
    marginBottom: 8,
    color: dashboardColors.sectionTitle,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  lead: {
    margin: "0 0 20px",
    fontSize: 15,
    lineHeight: 1.55,
    color: dashboardColors.subtitle,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: dashboardColors.sectionTitle,
    marginBottom: 6,
    letterSpacing: "0.02em",
  },
  textarea: {
    width: "100%",
    minHeight: 220,
    borderRadius: 12,
    border: `1px solid ${dashboardColors.textareaBorder}`,
    padding: "14px 16px",
    resize: "vertical",
    backgroundColor: dashboardColors.textareaBackground,
    color: dashboardColors.textareaText,
    fontSize: 15,
    lineHeight: 1.5,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  uploadContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  uploadButton: {
    padding: "12px 24px",
    borderRadius: 12,
    border: "none",
    backgroundColor: dashboardColors.uploadButtonBackground,
    color: dashboardColors.uploadButtonText,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background-color 0.15s ease, transform 0.15s ease",
    boxShadow: "0 4px 18px rgba(0, 122, 255, 0.22)",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${dashboardColors.textareaBorder}`,
    backgroundColor: dashboardColors.textareaBackground,
    color: dashboardColors.textareaText,
    marginBottom: 16,
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  errorText: {
    color: dashboardColors.deleteButtonText,
    fontSize: 13,
    marginTop: 8,
    marginBottom: 0,
  },
};

export default GenerateStudySessionCard;
