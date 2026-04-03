
import React, { useState, useMemo } from "react";
import { parseFlashcards } from "../../LLMServices/parsers/flashcardParser";
import { StudySessionColors } from "../../styles/colors";

interface FlashcardDisplayProps {
  rawData: string;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({ rawData }) => {
  const flashcards = useMemo(() => parseFlashcards(rawData), [rawData]);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!flashcards.length) {
    return <div style={{ color: StudySessionColors.sectionTitle }}>No flashcards to display.</div>;
  }

  const card = flashcards[current];

  const goPrev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
    setRevealed(false);
  };
  const goNext = () => {
    setCurrent((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev));
    setRevealed(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.question}>{card.question}</div>
        {revealed ? (
          <div style={styles.answer}>{card.answer}</div>
        ) : (
          <button
            style={{
              ...styles.showButton,
              backgroundColor: StudySessionColors.title,
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              padding: "10px 16px",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={() => setRevealed(true)}
          >
            Show Answer
          </button>
        )}
        {revealed && (
          <button style={styles.hideButton} onClick={() => setRevealed(false)}>
            Hide Answer
          </button>
        )}
      </div>
      <div style={styles.navRow}>
        <button
          onClick={goPrev}
          disabled={current === 0}
          style={{
            ...styles.navButton,
            backgroundColor: StudySessionColors.title,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            padding: "10px 16px",
            cursor: current === 0 ? "not-allowed" : "pointer",
            opacity: current === 0 ? 0.6 : 1,
          }}
        >
          ← Prev
        </button>
        <span style={styles.counter}>
          {current + 1} / {flashcards.length}
        </span>
        <button
          onClick={goNext}
          disabled={current === flashcards.length - 1}
          style={{
            ...styles.navButton,
            backgroundColor: StudySessionColors.title,
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            padding: "10px 16px",
            cursor: current === flashcards.length - 1 ? "not-allowed" : "pointer",
            opacity: current === flashcards.length - 1 ? 0.6 : 1,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
    height: "100%",
    minHeight: "100%",
  },
  card: {
    background: "#f8fafc",
    border: `1px solid ${StudySessionColors.cardBorder}`,
    borderRadius: 12,
    boxShadow: "0 2px 16px #0002",
    padding: 40,
    width: "100%",
    maxWidth: 600,
    minHeight: 220,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  question: {
    fontWeight: 600,
    marginBottom: 24,
    fontSize: 22,
    textAlign: "center",
  },
  answer: {
    color: "#234366",
    marginBottom: 24,
    fontSize: 18,
    textAlign: "center",
  },
  hideButton: {
    marginTop: 12,
    background: StudySessionColors.cancelButtonBackground,
    color: StudySessionColors.cancelButtonText,
    border: `1px solid ${StudySessionColors.cancelButtonBorder}`,
    borderRadius: 8,
    padding: "6px 18px",
    fontWeight: 500,
    cursor: "pointer",
    fontSize: 15,
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    gap: 32,
    marginTop: 18,
  },
  navButton: {
    border: "none",
    borderRadius: 8,
    padding: "10px 22px",
    fontWeight: 600,
    fontSize: 17,
  },
  counter: {
    fontWeight: 500,
    fontSize: 17,
  },
};

export default FlashcardDisplay;
