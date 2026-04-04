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
      <div style={{ color: StudySessionColors.sectionTitle }}>
        {rawData}
      </div>
    );
  }

  const question = quiz.questions[currentIndex];

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

    const updatedAnswers = [
      ...submittedAnswers,
      { userAnswer, isCorrect },
    ];

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
                  color: submittedAnswers[index]?.isCorrect ? "#2e7d32" : "#c62828",
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

      <button
        onClick={handleNext}
        style={{
          marginTop: "20px",
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
};

export default QuizDisplay;