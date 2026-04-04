import React, { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { workspaceColors, StudySessionColors } from "../styles/colors";
import {
  generateSummary,
  generateQuiz,
  generateFlashCards,
  generateKeyPoints,
} from "../LLMServices/services/prompts";
import { useLocation, useNavigate } from "react-router-dom";
import KeyPointsDisplay from "../components/study/KeyPointsDisplay";
import SummaryDisplay from "../components/study/SummaryDisplay";
import QuizDisplay from "../components/study/QuizDisplay";
import FlashcardDisplay from "../components/study/FlashcardDisplay";
import expandIcon from "../assets/expand.png";
import collapseIcon from "../assets/collapse.png";
import { getSession, updateSession } from "../utils/sessionStorage";
import type { StudySession } from "../types/session";

type TabType = "summary" | "quiz" | "flashcards" | "keypoints";

const StudyWorkspace: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sessionId } =
    (location.state as { sessionId?: string }) || {};

  const [session, setSession] = useState<StudySession | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  const [outputs, setOutputs] = useState<Record<TabType, string>>({
    summary: "",
    quiz: "",
    flashcards: "",
    keypoints: "",
  });

  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load session on mount and restore outputs
  useEffect(() => {
    if (!sessionId) return;

    const loaded = getSession(sessionId);
    if (!loaded) return;

    setSession(loaded);
    setOutputs({
      summary: loaded.outputs.summary,
      quiz: loaded.outputs.quiz,
      flashcards: loaded.outputs.flashcards,
      keypoints: loaded.outputs.keypoints,
    });

    // Update lastAccessedAt
    updateSession(sessionId, { lastAccessedAt: Date.now() });
  }, [sessionId]);

  const handleGenerate = async () => {
    if (!session?.studyMaterial) return;

    setLoading(true);
    setErrorMsg("");

    try {
      let result = "";

      if (activeTab === "summary") {
        result = await generateSummary(session.studyMaterial);
      } else if (activeTab === "quiz") {
        result = await generateQuiz(session.studyMaterial);
      } else if (activeTab === "flashcards") {
        result = await generateFlashCards(session.studyMaterial);
      } else if (activeTab === "keypoints") {
        result = await generateKeyPoints(session.studyMaterial);
      }

      setOutputs((prev) => ({ ...prev, [activeTab]: result }));

      if (sessionId) {
        updateSession(sessionId, {
          outputs: { ...outputs, [activeTab]: result },
          lastAccessedAt: Date.now(),
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred while generating content.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    if (sessionId) {
      updateSession(sessionId, { isCompleted: true, lastAccessedAt: Date.now() });
    }
    navigate("/mylibrary");
  };

  // Fallback when no session ID was provided
  if (!sessionId) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ ...styles.main, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: StudySessionColors.sectionTitle, marginBottom: 12 }}>
              No session found
            </h2>
            <p style={{ color: StudySessionColors.subtitle, marginBottom: 24 }}>
              Please create a new study session from the dashboard.
            </p>
            <button
              style={styles.doneButton}
              onClick={() => navigate("/studysession")}
            >
              Go to Study Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={styles.main}>
        <div>
          <h1 style={styles.title}>Study Workspace</h1>
          <p style={styles.subtitle}>{session?.title || "Untitled Session"}</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <TabButton
            label="Summary"
            active={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
          />
          <TabButton
            label="Key Points"
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

        {/* Error message */}
        {errorMsg && (
          <p style={styles.errorText}>{errorMsg}</p>
        )}

        {/* Output + Generate Button inside content box with overlay */}
        <div style={styles.relative}>
          <div
            style={{
              ...styles.contentBoxDynamic(isExpanded, outputs[activeTab]),
            }}
          >
            {/* Generate Button inside content box */}
            {!outputs[activeTab] && !loading && (
              <button
                onClick={handleGenerate}
                disabled={loading}
                style={styles.generateButtonDynamic(loading)}
              >
                {`Click to generate ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              </button>
            )}
            {/* Overlay for loading */}
            {loading && (
              <div style={styles.overlay}>
                <p style={styles.overlayText}>Generating {activeTab}...</p>
              </div>
            )}
            {/* Output */}
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
          {/* Expand/Collapse icon button */}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            style={styles.expandIconButton}
            aria-label={isExpanded ? "Minimize" : "Fullscreen"}
          >
            <img
              src={isExpanded ? collapseIcon : expandIcon}
              alt={isExpanded ? "Minimize" : "Fullscreen"}
              style={styles.expandIconImg}
            />
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button
            type="button"
            style={styles.doneButton}
            onClick={handleDone}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = StudySessionColors.uploadButtonHover;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = StudySessionColors.uploadButtonBackground;
            }}
          >
            Done
          </button>
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

const styles = {
  relative: {
    position: "relative" as const,
  },
  contentBoxDynamic: (isExpanded: boolean, hasOutput: string) => ({
    ...styles.contentBox,
    height: isExpanded ? "60vh" : "400px",
    background: "linear-gradient(135deg, #f5f6fa 60%, #e3e6ee 100%)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    border: `1px solid ${StudySessionColors.cardBorder}`,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: hasOutput ? "flex-start" : "center",
  }),
  generateButtonDynamic: (loading: boolean) => ({
    ...styles.generateButton,
    backgroundColor: StudySessionColors.uploadButtonBackground,
    color: StudySessionColors.uploadButtonText,
    border: "none",
    fontWeight: 600,
    fontSize: "18px",
    width: "auto",
    minWidth: 220,
    padding: "14px 32px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px #0001",
    cursor: loading ? "not-allowed" : "pointer",
    margin: "0 auto",
    marginBottom: "12px",
    textAlign: "center" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  overlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(200, 200, 210, 0.45)",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
  },
  overlayText: {
    fontSize: 20,
    color: StudySessionColors.sectionTitle,
    fontWeight: 600,
  },
  outputBox: {
    width: "100%",
    height: "100%",
  },
  expandIconButton: {
    position: "absolute" as const,
    top: 18,
    right: 18,
    background: "#f5f6fa",
    border: `1px solid ${StudySessionColors.cardBorder}`,
    borderRadius: "50%",
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px #0001",
    cursor: "pointer",
    zIndex: 3,
    padding: 0,
  },
  expandIconImg: {
    width: 22,
    height: 22,
    objectFit: "contain" as const,
  },
  doneButton: {
    padding: "10px 24px",
    borderRadius: 12,
    border: "none",
    backgroundColor: StudySessionColors.uploadButtonBackground,
    color: StudySessionColors.uploadButtonText,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
    boxShadow: "0 4px 18px rgba(0, 122, 255, 0.22)",
    marginTop: 24,
  },
  errorText: {
    color: StudySessionColors.deleteButtonText,
    fontSize: 14,
    marginTop: 12,
    marginBottom: 0,
  },
  title: {
    fontSize: "32px",
    marginBottom: "24px",
    color: StudySessionColors.title,
    textAlign: "left" as const,
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "24px",
    color: StudySessionColors.subtitle,
    textAlign: "left" as const,
  },
  main: {
    flex: 1,
    padding: "40px",
    background: `linear-gradient(135deg, ${StudySessionColors.pageGradientStart}, ${StudySessionColors.pageGradientEnd})`,
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
    justifyContent: "space-between" as const,
  },
  tabButton: {
    flex: 1,
    padding: "12px 0",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    color: StudySessionColors.sectionTitle,
    transition: "all 0.2s ease",
  },
  contentBox: {
    marginTop: "30px",
    border: `1px solid ${StudySessionColors.cardBorder}`,
    borderRadius: "16px",
    height: "400px",
    maxHeight: "80vh",
    display: "flex",
    justifyContent: "flex-start" as const,
    alignItems: "flex-start" as const,
    backgroundColor: StudySessionColors.cardBackground,
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    padding: "20px",
    overflowY: "auto" as const,
    transition: "height 0.3s ease",
  },
  contentText: {
    fontSize: "18px",
    color: StudySessionColors.textareaText,
    width: "100%",
    whiteSpace: "pre-wrap" as const,
    textAlign: "left" as const,
  },
  generateButton: {
    justifyContent: "center" as const,
    marginTop: "20px",
    borderRadius: "12px",
    height: "40px",
    width: "170px",
    fontSize: "16px",
    backgroundColor: workspaceColors.generateButtonBackground,
  },
};
