import React, { useMemo, useState } from "react";
import { parseQuiz } from "../../LLMServices/parsers/quizParser";
import { StudySessionColors } from "../../styles/colors";

interface Props {
  rawData: string;
}

const QuizDisplay: React.FC<Props> = ({ rawData }) => {
  const quiz = useMemo(() => parseQuiz(rawData), [rawData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    { userAnswer: string; isCorrect: boolean }[]
  >([]);

  if (!quiz) {
    return (
      <div style={{ color: StudySessionColors.sectionTitle }}>{rawData}</div>
    );
  }

  const question = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleNext = () => {
    let userAnswer = "";
    let isCorrect = false;

    if (question.type === "multiple-choice") {
      userAnswer = selectedOption;
      isCorrect = selectedOption === question.correctAnswer;
    } else {
      userAnswer = shortAnswer;
      isCorrect =
        shortAnswer.trim().toLowerCase() ===
        question.correctAnswer.trim().toLowerCase();
    }

    const updatedAnswers = [...submittedAnswers];
    updatedAnswers[currentIndex] = { userAnswer, isCorrect };
    setSubmittedAnswers(updatedAnswers);

    setSubmittedAnswers(updatedAnswers);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption("");
    setShortAnswer("");

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;

    const prevIndex = currentIndex - 1;
    const prevAnswer = submittedAnswers[prevIndex]?.userAnswer || "";

    const prevQuestion = quiz.questions[prevIndex];

    if (prevQuestion.type === "multiple-choice") {
      setSelectedOption(prevAnswer);
      setShortAnswer("");
    } else {
      setShortAnswer(prevAnswer);
      setSelectedOption("");
    }

    setCurrentIndex(prevIndex);
  };

  if (showResult) {
    const finalScore = submittedAnswers.filter((a) => a.isCorrect).length;

    return (
      <div style={{ width: "100%", textAlign: "left" }}>
        <h2 style={{ color: StudySessionColors.title }}>Quiz Complete 🎉</h2>
        <p style={{ color: StudySessionColors.sectionTitle, fontSize: "18px" }}>
          Score: {finalScore} / {quiz.questions.length}
        </p>

        <div style={styles.answerKeyContainer}>
          <h3 style={styles.answerKeyTitle}>Answer Key</h3>

          {quiz.questions.map((q, index) => (
            <div key={index} style={styles.answerCard}>
              <p style={styles.questionText}>
                <strong>Q{index + 1}:</strong> {q.question}
              </p>
              <p style={styles.answerText}>
                <strong>Correct answer:</strong> {q.correctAnswer}
              </p>
              <p style={styles.answerText}>
                <strong>Your answer:</strong>{" "}
                {submittedAnswers[index]?.userAnswer?.trim()
                  ? submittedAnswers[index].userAnswer
                  : "No answer"}
              </p>
              <p
                style={{
                  ...styles.resultText,
                  color: submittedAnswers[index]?.isCorrect
                    ? "#2e7d32"
                    : "#c62828",
                }}
              >
                {submittedAnswers[index]?.isCorrect ? "Correct" : "Incorrect"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      <h2 style={{ color: StudySessionColors.title }}>{quiz.title}</h2>

      <div style={styles.progressWrapper}>
      <div style={styles.progressBackground}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progress}%`,
          }}
        />
      </div>
      <p style={styles.progressText}>
        Question {currentIndex + 1} of {quiz.questions.length}
      </p>
    </div>

      <p style={{ fontWeight: 600 }}>
        Q{currentIndex + 1}: {question.question}
      </p>

      {question.type === "multiple-choice" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedOption(opt)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: selectedOption === opt ? "#d0e6ff" : "white",
                cursor: "pointer",
                textAlign: "left",
                color: StudySessionColors.sectionTitle,
                marginTop: "4px",
                maxWidth: "800px",
                fontSize: "16px",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === "short-answer" && (
        <input
          value={shortAnswer}
          onChange={(e) => setShortAnswer(e.target.value)}
          placeholder="Type your answer..."
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            color: StudySessionColors.sectionTitle,
          }}
        />
      )}

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    width: "100%",
    maxWidth: "800px",
  }}
>
  {/* Back button (left) */}
  <button
    onClick={handleBack}
    disabled={currentIndex === 0}
    style={{
      padding: "10px 16px",
      borderRadius: "10px",
      backgroundColor: "#ccc",
      color: "black",
      border: "none",
      cursor: currentIndex === 0 ? "not-allowed" : "pointer",
      opacity: currentIndex === 0 ? 0.6 : 1,
      fontSize: "16px",
    }}
  >
    ← Back
  </button>

  {/* Next button (right) */}
  <button
    onClick={handleNext}
    style={{
      padding: "10px 16px",
      borderRadius: "10px",
      backgroundColor: StudySessionColors.title,
      color: "white",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Next Question →
  </button>
</div>

      <p style={{ marginTop: "12px", opacity: 0.7 }}>
        Question {currentIndex + 1} / {quiz.questions.length}
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  answerKeyContainer: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  answerKeyTitle: {
    color: StudySessionColors.title,
    marginBottom: "8px",
  },
  answerCard: {
    border: `1px solid ${StudySessionColors.cardBorder}`,
    borderRadius: "10px",
    padding: "16px",
    backgroundColor: "#f8fafc",
  },
  questionText: {
    marginBottom: "8px",
    color: StudySessionColors.sectionTitle,
  },
  answerText: {
    margin: "4px 0",
    color: StudySessionColors.sectionTitle,
  },
  resultText: {
    marginTop: "8px",
    fontWeight: 600,
  },

  progressWrapper: {
  width: "100%",
  maxWidth: "800px",
  margin: "16px 0 20px 0",
},
progressBackground: {
  width: "100%",
  height: "10px",
  backgroundColor: "#e5e7eb",
  borderRadius: "999px",
  overflow: "hidden",
},
progressFill: {
  height: "100%",
  borderRadius: "999px",
  backgroundColor: "#0388fc",
  transition: "width 0.3s ease",
},
progressText: {
  marginTop: "8px",
  fontSize: "14px",
  color: StudySessionColors.sectionTitle,
  opacity: 0.8,
},
};

export default QuizDisplay;
