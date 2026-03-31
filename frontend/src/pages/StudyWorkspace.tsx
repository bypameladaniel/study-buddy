import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { workspaceColors, dashboardColors } from "../styles/colors";
import {
  generateSummary,
  generateQuiz,
  generateFlashCards,
} from "../LLMServices/services/prompts";
import { useLocation } from "react-router-dom";

type TabType = "summary" | "quiz" | "flashcards";

const StudyWorkspace: React.FC = () => {
  const location = useLocation();

  const { studyMaterial, sessionTitle } =
    (location.state as {
      studyMaterial?: string;
      sessionTitle?: string;
    }) || {};

  const [activeTab, setActiveTab] = useState<TabType>("summary");

  const [outputs, setOutputs] = useState<Record<TabType, string>>({
    summary: "",
    quiz: "",
    flashcards: "",
  });

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!studyMaterial) return;

    setLoading(true);

    let result = "";

    if (activeTab === "summary") {
      result = await generateSummary(studyMaterial);
    } else if (activeTab === "quiz") {
      result = await generateQuiz(studyMaterial);
    } else if (activeTab === "flashcards") {
      result = await generateFlashCards(studyMaterial);
    }

    setOutputs((prev) => ({
      ...prev,
      [activeTab]: result,
    }));

    setLoading(false);
  };

  const getContent = () => {
    const current = outputs[activeTab];

    if (loading) {
      return `Generating ${activeTab}...`;
    }

    if (!current) {
      return `Click "Generate" to create a ${activeTab}.`;
    }
    return current;
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.main}>
        <div>
          <h1 style={styles.title}>Study Workspace</h1>
          <p style={styles.subtitle}>{sessionTitle || "Untitled Session"}</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <TabButton
            label="Summary"
            active={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
          />
          <TabButton
            label="Quiz"
            active={activeTab === "quiz"}
            onClick={() => setActiveTab("quiz")}
          />
          <TabButton
            label="Flashcards"
            active={activeTab === "flashcards"}
            onClick={() => setActiveTab("flashcards")}
          />
        </div>

        {/* Generate Button */}
        <div >
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              ...styles.generateButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating..." : `Generate ${activeTab}`}
          </button>
        </div>

        {/* Output */}
        <div style={styles.contentBox}>
          <p style={styles.contentText}>{getContent()}</p>
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
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: dashboardColors.cardBackground, 
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      padding: "20px",
      overflowY: "auto",
    },
  
    contentText: {
      fontSize: "18px",
      color: dashboardColors.textareaText, 
      width: "100%",
      whiteSpace: "pre-wrap",
      textAlign: "left",
    },
    generateButton: {
      justifyContent: "center",
      marginTop: "20px",
      borderRadius: "12px",
      height: "40px",
      width: "170px",
      fontSize: "16px",
      backgroundColor: workspaceColors.generateButtonBackground,
    },
  };