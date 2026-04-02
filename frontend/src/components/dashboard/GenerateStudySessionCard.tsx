import React, { useState } from "react";
import { dashboardColors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import {
  createSessionId,
  saveSession,
} from "../../utils/sessionStorage";

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

    const now = Date.now();
    const session = {
      id: createSessionId(),
      title: sessionName.trim() || "Untitled Session",
      studyMaterial: text,
      outputs: { summary: "", quiz: "", flashcards: "" },
      createdAt: now,
      lastAccessedAt: now,
    };
    saveSession(session);

    navigate("/study-workspace", {
      state: { sessionId: session.id },
    });
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>Generate New Study Session</h2>

      <input
        type="text"
        placeholder="Name your study session"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Paste your academic content here (Text only)"
        style={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
     {showError && !text.trim() && (
      <p style={{ color: "red", fontSize: "12px", marginTop: "6px" }}>
      Please enter content before uploading.
      </p>
      )}

      <div style={styles.uploadContainer}>
        <button style={styles.uploadButton} onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: dashboardColors.cardBackground,
    border: `1px solid ${dashboardColors.cardBorder}`,
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },
  sectionTitle: {
    fontSize: "22px",
    marginBottom: "18px",
    color: dashboardColors.sectionTitle,
  },
  textarea: {
    width: "100%",
    height: "240px",
    borderRadius: "14px",
    border: `1px solid ${dashboardColors.textareaBorder}`,
    padding: "16px",
    resize: "none",
    backgroundColor: dashboardColors.textareaBackground,
    color: dashboardColors.textareaText,
    marginTop: "10px",
    fontSize: "14px",
    outline: "none",
  },
  uploadContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  uploadButton: {
    padding: "10px 20px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: dashboardColors.uploadButtonBackground,
    color: dashboardColors.uploadButtonText,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${dashboardColors.textareaBorder}`,
    backgroundColor: dashboardColors.textareaBackground,
    color: dashboardColors.textareaText,
    marginBottom: "12px",
    fontSize: "14px",
  },
};

export default GenerateStudySessionCard;
