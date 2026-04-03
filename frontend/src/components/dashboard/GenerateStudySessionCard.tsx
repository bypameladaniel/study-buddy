import React, { useRef, useState } from "react";
import { dashboardColors } from "../../styles/colors";
import { useNavigate } from "react-router-dom";

const GenerateStudySessionCard: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [text, setText] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [showError, setShowError] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain" && !file.name.endsWith(".txt")) {
      setFileError("Please upload a .txt file.");
      e.target.value = "";
      return;
    }

    setFileError("");

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target?.result;
      if (typeof fileContent === "string") {
        setText(fileContent);
        if (showError) setShowError(false);

        if (!sessionName.trim()) {
          const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
          setSessionName(nameWithoutExtension);
        }
      }
    };

    reader.onerror = () => {
      setFileError("Failed to read the file. Please try again.");
    };

    reader.readAsText(file);
    e.target.value = "";
  };

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
        Name your session, paste your notes or reading, or upload a text file to open the workspace.
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

      {fileError && <p style={styles.errorText}>{fileError}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,text/plain"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div style={styles.buttonRow}>
        <button
          type="button"
          style={styles.secondaryButton}
          onClick={handleOpenFilePicker}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = dashboardColors.cardBorder;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          Upload text file
        </button>

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
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    gap: 12,
    flexWrap: "wrap",
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
  secondaryButton: {
    padding: "12px 20px",
    borderRadius: 12,
    border: `1px solid ${dashboardColors.cardBorder}`,
    backgroundColor: "transparent",
    color: dashboardColors.sectionTitle,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  errorText: {
    color: dashboardColors.deleteButtonText,
    fontSize: 13,
    marginTop: 8,
    marginBottom: 0,
  },
};

export default GenerateStudySessionCard;