import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { dashboardColors } from "../styles/colors";
import StudyCard from "../components/dashboard/StudyCard";
import { getSessions } from "../utils/sessionStorage";
import type { StudySession } from "../types/session";

const MyLibrary: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    const all = getSessions();
    const sorted = [...all].sort((a, b) => b.lastAccessedAt - a.lastAccessedAt);
    setSessions(sorted);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.container}>
        <h1 style={styles.title}>My Library</h1>
        <p style={styles.subtitle}>All your study sessions</p>

        {sessions.length === 0 ? (
          <p style={styles.emptyState}>
            No sessions yet. Go to the Dashboard to create one!
          </p>
        ) : (
          <div style={styles.cardGrid}>
            {sessions.map((session) => (
              <StudyCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flex: 1,
    padding: "40px",
    background: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)`,
    minHeight: "100vh",
  },
  title: {
    fontSize: "32px",
    marginBottom: "8px",
    color: dashboardColors.title,
  },
  subtitle: {
    fontSize: "14px",
    color: dashboardColors.subtitle,
    marginBottom: "30px",
  },
  cardGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  emptyState: {
    fontSize: "14px",
    color: dashboardColors.subtitle,
    fontStyle: "italic",
  },
};
