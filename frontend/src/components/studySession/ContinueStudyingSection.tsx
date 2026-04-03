import React, { useEffect, useState } from "react";
import { StudySessionColors } from "../../styles/colors";
import StudyCard from "./StudyCard";
import { getSessions } from "../../utils/sessionStorage";
import type { StudySession } from "../../types/session";

const ContinueStudyingSection: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    const all = getSessions()
      .filter((s) => !s.isCompleted)
      .sort((a, b) => b.lastAccessedAt - a.lastAccessedAt)
      .slice(0, 4);
    setSessions(all);
  }, []);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Continue Studying</h2>
      <p style={styles.subtitle}>Recently accessed workspaces</p>

      {sessions.length === 0 ? (
        <p style={styles.emptyText}>
          No sessions yet. Create one above to get started!
        </p>
      ) : (
        <div style={styles.cardGrid}>
          {sessions.map((session) => (
            <StudyCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "23px",
    marginBottom: "10px",
    color: StudySessionColors.sectionTitle,
  },
  subtitle: {
    fontSize: "14px",
    color: StudySessionColors.subtitle,
    marginBottom: "15px",
  },
  cardGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  emptyText: {
    fontSize: "14px",
    color: StudySessionColors.subtitle,
    marginTop: "8px",
  },
};

export default ContinueStudyingSection;
