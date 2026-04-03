import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { StudySessionColors } from "../styles/colors";
import StudyCard from "../components/studySession/StudyCard";
import { getSessions } from "../utils/sessionStorage";
import type { StudySession } from "../types/session";

const MyLibrary: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    const all = getSessions()
      .filter((s) => s.isCompleted)
      .sort((a, b) => b.lastAccessedAt - a.lastAccessedAt);
    setSessions(all);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.main}>
        <h1 style={styles.title}>My Library</h1>
        <p style={styles.subtitle}>Your completed study sessions</p>

        {sessions.length === 0 ? (
          <p style={styles.emptyText}>
            No completed sessions yet. Finish a session in the workspace to see it here!
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
};

export default MyLibrary;
