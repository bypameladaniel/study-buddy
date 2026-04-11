import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { StudySessionColors } from "../styles/colors";
import StudyCard from "../components/studySession/StudyCard";
import { getSessions, deleteSession } from "../utils/sessionStorage";
import type { StudySession } from "../types/session";

const MyLibrary: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  useEffect(() => {
    const all = getSessions()
      .filter((s) => s.isCompleted)
      .sort((a, b) => b.lastAccessedAt - a.lastAccessedAt);
    setSessions(all);
  }, []);

  const handleDelete = (id: string) => {
    setSessionToDelete(id);
  };
  const confirmDelete = () => {
    if (!sessionToDelete) return;

    deleteSession(sessionToDelete);
    setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete));
    setSessionToDelete(null);
  };
  const cancelDelete = () => {
    setSessionToDelete(null);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.main}>
        <h1 style={styles.title}>My Library</h1>
        <p style={styles.subtitle}>Your completed study sessions</p>

        {sessions.length === 0 ? (
          <p style={styles.emptyText}>
            No completed sessions yet. Finish a session in the workspace to see
            it here!
          </p>
        ) : (
          <div style={styles.cardGrid}>
            {sessions.map((session) => (
              <StudyCard
                key={session.id}
                session={session}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      {sessionToDelete && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Delete session?</h2>
            <p style={styles.modalText}>
              Are you sure you want to delete this study session? This action
              cannot be undone.
            </p>

            <div style={styles.modalActions}>
              <button
                type="button"
                style={styles.cancelButton}
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                style={styles.confirmButton}
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    flex: 1,
    padding: "40px",
    background: `linear-gradient(135deg, ${StudySessionColors.pageGradientStart}, ${StudySessionColors.pageGradientEnd})`,
  },
  title: {
    fontSize: "32px",
    marginBottom: "8px",
    color: StudySessionColors.title,
  },
  subtitle: {
    fontSize: "16px",
    color: StudySessionColors.subtitle,
    marginBottom: "32px",
    marginTop: 0,
  },
  cardGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  emptyText: {
    fontSize: "15px",
    color: StudySessionColors.subtitle,
    marginTop: "8px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: "28px 24px",
    width: "90%",
    maxWidth: "420px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  modalTitle: {
    margin: "0 0 12px 0",
    fontSize: "22px",
    color: StudySessionColors.title,
  },
  modalText: {
    margin: "0 0 24px 0",
    fontSize: "15px",
    lineHeight: 1.5,
    color: StudySessionColors.subtitle,
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: `1px solid ${StudySessionColors.studyCardBorder}`,
    backgroundColor: "#fff",
    color: StudySessionColors.title,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
  confirmButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#e85d75",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
  },
};

export default MyLibrary;
