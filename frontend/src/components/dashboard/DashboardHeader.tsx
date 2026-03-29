import React from "react";
import { dashboardColors } from "../../styles/colors";

const DashboardHeader: React.FC = () => {
  return <h1 style={styles.title}>Dashboard</h1>;
};

const styles: { [key: string]: React.CSSProperties } = {
  title: {
    fontSize: "32px",
    marginBottom: "24px",
    color: dashboardColors.title,
    textAlign: "left"
  },
};

export default DashboardHeader;
