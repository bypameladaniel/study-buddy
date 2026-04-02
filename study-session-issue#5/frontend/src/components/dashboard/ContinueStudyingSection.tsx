import React, { useState, useEffect } from "react";
import { dashboardColors } from "../../styles/colors";
import StudyCard from "./StudyCard";
import { getSessions } from "../../utils/sessionStorage";
import type { StudySession } from "../../types/session";

const MAX_CARDS = 4;

const ContinueStudyingSection: React.FC = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    const all = getSessions();
    // Sort by most recently accessed, show up to MAX_CARDS
    const sorted = [...all].sort((a, b) => b.lastAccessedAt - a.lastAccessedAt);
    setSessions(sorted.slice(0, MAX_CARDS));
  }, []);

  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>Continue Studying</h2>
      <p style={styles.subtitle}>Recently accessed workspaces</p>

      {sessions.length === 0 ? (
        <p style={styles.emptyState}>
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
    color: dashboardColors.sectionTitle,
  },
  subtitle: {
    fontSize: "14px",
    color: dashboardColors.subtitle,
    marginBottom: "15px",
  },
  cardGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  emptyState: {
    fontSize: "14px",
    color: dashboardColors.subtitle,
    fontStyle: "italic",
  },
};

export default ContinueStudyingSection;
