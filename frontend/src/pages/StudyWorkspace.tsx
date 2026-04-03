import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { workspaceColors, dashboardColors } from "../styles/colors";
import {
  generateSummary,
  generateQuiz,
  generateFlashCards,
  generateKeyPoints,
} from "../LLMServices/services/prompts";
import { useLocation } from "react-router-dom";
import KeyPointsDisplay from "../components/study/KeyPointsDisplay";
import SummaryDisplay from "../components/study/SummaryDisplay";
import QuizDisplay from "../components/study/QuizDisplay";
import FlashcardDisplay from "../components/study/FlashcardDisplay";

type TabType = "summary" | "quiz" | "flashcards" | "keypoints";

/** Matches the original compact empty / loading panel */
const COMPACT_BOX_PX = 400;

const styles = {
  page: {
    display: "flex" as const,
    alignItems: "stretch" as const,
    minHeight: "100dvh" as const,
    width: "100%",
    minWidth: 0,
    fontFamily: '"DM Sans", system-ui, sans-serif',
    backgroundColor: dashboardColors.pageBackground,
    backgroundImage: `linear-gradient(180deg, ${dashboardColors.pageGradientStart} 0%, ${dashboardColors.pageGradientEnd} 100%)`,
  },
  relative: (compact: boolean) =>
    compact
      ? ({
          position: "relative" as const,
          flex: 1,
          minHeight: 0,
          display: "flex" as const,
          flexDirection: "column" as const,
        } as const)
      : ({
          position: "relative" as const,
          flex: "none" as const,
          display: "block" as const,
        } as const),
  contentBox: (compact: boolean, centerEmpty: boolean) =>
    compact
      ? {
          position: "relative" as const,
          width: "100%",
          height: COMPACT_BOX_PX,
          minHeight: COMPACT_BOX_PX,
          maxHeight: COMPACT_BOX_PX,
          marginTop: 24,
          border: `1px solid ${dashboardColors.cardBorder}`,
          borderRadius: 16,
          background: `linear-gradient(145deg, ${workspaceColors.contentGradientStart} 0%, ${workspaceColors.contentGradientEnd} 100%)`,
          boxShadow: dashboardColors.shadowLg,
          display: "flex" as const,
          flexDirection: "column" as const,
          alignItems: centerEmpty ? ("center" as const) : ("stretch" as const),
          justifyContent: centerEmpty ? ("center" as const) : ("flex-start" as const),
          padding: 20,
          overflow: "hidden" as const,
          boxSizing: "border-box" as const,
          flexShrink: 0,
        }
      : {
          position: "relative" as const,
          width: "100%",
          marginTop: 24,
          border: `1px solid ${dashboardColors.cardBorder}`,
          borderRadius: 16,
          background: `linear-gradient(145deg, ${workspaceColors.contentGradientStart} 0%, ${workspaceColors.contentGradientEnd} 100%)`,
          boxShadow: dashboardColors.shadowLg,
          display: "flex" as const,
          flexDirection: "column" as const,
          alignItems: "stretch" as const,
          justifyContent: "flex-start" as const,
          padding: 20,
          overflow: "visible" as const,
          boxSizing: "border-box" as const,
          minHeight: "min-content" as const,
        },
  generateButtonDynamic: (loading: boolean) => ({
    backgroundColor: dashboardColors.uploadButtonBackground,
    color: dashboardColors.uploadButtonText,
    border: "none",
    fontWeight: 600,
    fontSize: 16,
    width: "auto",
    minWidth: 200,
    padding: "14px 28px",
    borderRadius: 12,
    boxShadow: "0 4px 18px rgba(0, 122, 255, 0.22)",
    cursor: loading ? ("not-allowed" as const) : ("pointer" as const),
    opacity: loading ? 0.65 : 1,
    textAlign: "center" as const,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    fontFamily: "inherit",
    flexShrink: 0,
  }),
  overlay: {
    position: "absolute" as const,
    inset: 0,
    background: "rgba(248, 250, 252, 0.72)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    zIndex: 2,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: 16,
  },
  overlayText: {
    fontSize: 17,
    color: dashboardColors.sectionTitle,
    fontWeight: 600,
  },
  outputBox: {
    width: "100%",
    flex: "0 0 auto" as const,
  },
  title: {
    fontSize: 32,
    margin: 0,
    marginBottom: 8,
    color: dashboardColors.title,
    textAlign: "left" as const,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    flexShrink: 0,
  },
  sessionBadge: {
    display: "inline-block" as const,
    fontSize: 15,
    marginBottom: 0,
    color: dashboardColors.subtitle,
    textAlign: "left" as const,
    padding: "6px 12px",
    background: dashboardColors.studyCardBackground,
    borderRadius: 8,
    border: `1px solid ${dashboardColors.cardBorder}`,
    fontWeight: 500,
    flexShrink: 0,
  },
  main: {
    flex: 1,
    minWidth: 0,
    display: "flex" as const,
    flexDirection: "column" as const,
    padding: "24px 32px 40px",
    backgroundColor: "transparent",
    boxSizing: "border-box" as const,
    width: "100%",
    maxWidth: "100%",
  },
  headerBlock: {
    flexShrink: 0,
    marginBottom: 20,
  },
  tabs: {
    display: "flex" as const,
    gap: 6,
    backgroundColor: workspaceColors.tabBackground,
    padding: 6,
    borderRadius: 14,
    marginTop: 0,
    width: "100%",
    boxSizing: "border-box" as const,
    flexShrink: 0,
  },
  workspaceGrow: (compact: boolean) =>
    compact
      ? ({
          flex: 1,
          minHeight: 0,
          display: "flex" as const,
          flexDirection: "column" as const,
        } as const)
      : ({
          flex: "none" as const,
          display: "block" as const,
        } as const),
  tabButton: {
    flex: 1,
    padding: "10px 8px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer" as const,
    fontWeight: 600,
    fontSize: 14,
    color: dashboardColors.subtitle,
    transition: "background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease",
    fontFamily: "inherit",
  },
  tabButtonActive: {
    backgroundColor: workspaceColors.tabActive,
    color: dashboardColors.sectionTitle,
    boxShadow: dashboardColors.shadowSm,
  },
  tabButtonIdle: {
    backgroundColor: "transparent",
    color: dashboardColors.subtitle,
  },
  contentText: {
    fontSize: 17,
    color: dashboardColors.textareaText,
    width: "100%",
    whiteSpace: "pre-wrap" as const,
    textAlign: "left" as const,
    lineHeight: 1.55,
  },
};

type TabProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const TabButton: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...styles.tabButton,
        ...(active ? styles.tabButtonActive : styles.tabButtonIdle),
      }}
    >
      {label}
    </button>
  );
};

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
    keypoints: "",
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
    } else if (activeTab === "keypoints") {
      result = await generateKeyPoints(studyMaterial);
    }

    setOutputs((prev) => ({
      ...prev,
      [activeTab]: result,
    }));

    setLoading(false);
  };

  const label =
    activeTab === "flashcards"
      ? "Flashcards"
      : activeTab === "keypoints"
        ? "Key points"
        : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  const hasOutput = Boolean(outputs[activeTab]);
  const centerEmpty = !hasOutput && !loading;
  const compactPanel = !hasOutput;

  return (
    <div style={styles.page}>
      <Sidebar />
      <div style={styles.main}>
        <div style={styles.headerBlock}>
          <h1 style={styles.title}>Study workspace</h1>
          <p style={{ ...styles.sessionBadge, marginTop: 10 }}>
            {sessionTitle || "Untitled session"}
          </p>
        </div>

        <div style={styles.tabs} role="tablist" aria-label="Study tools">
          <TabButton
            label="Summary"
            active={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
          />
          <TabButton
            label="Key points"
            active={activeTab === "keypoints"}
            onClick={() => setActiveTab("keypoints")}
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

        <div style={styles.workspaceGrow(compactPanel)}>
          <div style={styles.relative(compactPanel)}>
            <div style={styles.contentBox(compactPanel, centerEmpty)}>
              {!outputs[activeTab] && !loading && (
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading}
                  style={styles.generateButtonDynamic(loading)}
                  onMouseOver={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor =
                        dashboardColors.uploadButtonHover;
                    }
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor =
                      dashboardColors.uploadButtonBackground;
                  }}
                >
                  Generate {label.toLowerCase()}
                </button>
              )}
              {loading && (
                <div style={styles.overlay}>
                  <p style={styles.overlayText}>
                    Generating {label.toLowerCase()}…
                  </p>
                </div>
              )}
              {!loading && outputs[activeTab] && (
                <div style={styles.outputBox}>
                  {activeTab === "summary" ? (
                    <SummaryDisplay rawData={outputs.summary} />
                  ) : activeTab === "keypoints" ? (
                    <KeyPointsDisplay rawData={outputs.keypoints} />
                  ) : activeTab === "quiz" ? (
                    <QuizDisplay rawData={outputs.quiz} />
                  ) : activeTab === "flashcards" ? (
                    <FlashcardDisplay rawData={outputs.flashcards} />
                  ) : (
                    <p style={styles.contentText}>{outputs[activeTab]}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyWorkspace;
