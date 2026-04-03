import React from "react";
import { dashboardColors } from "../../styles/colors";

const DashboardHeader: React.FC = () => {
  return (
    <header style={styles.wrap}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.tagline}>Create a session or pick up where you left off.</p>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrap: {
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    margin: 0,
    marginBottom: 8,
    color: dashboardColors.title,
    textAlign: "left",
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  tagline: {
    margin: 0,
    fontSize: 16,
    color: dashboardColors.subtitle,
    lineHeight: 1.5,
    maxWidth: 480,
  },
};

export default DashboardHeader;
