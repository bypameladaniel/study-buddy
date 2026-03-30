import React, { useState } from "react";
import { dashboardColors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";

const GenerateStudySessionCard: React.FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleUpload = () => {
    navigate("/study-workspace", {
      state: { studyMaterial: text },
    });
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.sectionTitle}>Generate New Study Session</h2>

      <textarea
        placeholder="Paste your academic content here (Text only)"
        style={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

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
};

export default GenerateStudySessionCard;
