import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { workspaceColors, dashboardColors } from "../styles/colors";

const StudyWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"summary" | "quiz" | "flashcards">("summary");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.main}>
        <div>
        <h1 style={styles.title}>Study Workspace</h1>
          <p style={styles.subtitle}>SOEN 357 - Lecture 4: UX Design Process</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <TabButton label="Summary" active={activeTab === "summary"} onClick={() => setActiveTab("summary")} />
          <TabButton label="Quiz" active={activeTab === "quiz"} onClick={() => setActiveTab("quiz")} />
          <TabButton label="Flashcards" active={activeTab === "flashcards"} onClick={() => setActiveTab("flashcards")} />
        </div>

        {/* Content Box */}
        <div style={styles.contentBox}>
          {activeTab === "summary" && <p style={styles.contentText}>AI SUMMARIZED TEXT HERE</p>}
          {activeTab === "quiz" && <p style={styles.contentText}>QUIZ CONTENT HERE</p>}
          {activeTab === "flashcards" && <p style={styles.contentText}>FLASHCARDS CONTENT HERE</p>}
        </div>
      </div>
    </div>
  );
};

export default StudyWorkspace;

type TabProps = {
    label: string;
    active: boolean;
    onClick: () => void;
  };
  
  const TabButton: React.FC<TabProps> = ({ label, active, onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{
          ...styles.tabButton,
          backgroundColor: active
            ? workspaceColors.tabActive
            : workspaceColors.tabInactive,
          boxShadow: active ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        {label}
      </button>
    );
  };

  const styles: { [key: string]: React.CSSProperties } = {
    title: {
      fontSize: "32px",
      marginBottom: "24px",
      color: dashboardColors.title,
      textAlign: "left",
    },
  
    subtitle: {
      fontSize: "18px",
      marginBottom: "24px",
      color: dashboardColors.subtitle,
      textAlign: "left",
    },
  
    main: {
      flex: 1,
      padding: "40px",
      background: `linear-gradient(135deg, ${dashboardColors.pageGradientStart}, ${dashboardColors.pageGradientEnd})`,
    },
  
    tabs: {
      display: "flex",
      gap: "16px",
      backgroundColor: workspaceColors.tabBackground, 
      padding: "12px",
      borderRadius: "12px",
      marginTop: "20px",
  
      width: "100%",
      maxWidth: "700px",
      marginLeft: "auto",
      marginRight: "auto",
  
      justifyContent: "space-between",
    },
  
    tabButton: {
      flex: 1,
      padding: "12px 0",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      color: dashboardColors.sectionTitle, 
      transition: "all 0.2s ease",
    },
  
    contentBox: {
      marginTop: "30px",
      border: `1px solid ${dashboardColors.cardBorder}`, 
      borderRadius: "16px",
      height: "400px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: dashboardColors.cardBackground, 
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      padding: "20px",
    },
  
    contentText: {
      fontSize: "18px",
      color: dashboardColors.textareaText, 
    },
  };