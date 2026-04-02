import React, { useMemo, useState } from "react";
import { parseQuiz } from "../../LLMServices/parsers/quizParser";
import { dashboardColors } from "../../styles/colors";

interface Props {
  rawData: string;
}

const QuizDisplay: React.FC<Props> = ({ rawData }) => {
  const quiz = useMemo(() => parseQuiz(rawData), [rawData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [shortAnswer, setShortAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!quiz) {
    return <div style={{ color: dashboardColors.sectionTitle }}>{rawData}</div>;
  }

  const question = quiz.questions[currentIndex];

  const handleNext = () => {
    let isCorrect = false;

    if (question.type === "multiple-choice") {
      isCorrect = selectedOption === question.correctAnswer;
    } else {
      isCorrect =
        shortAnswer.trim().toLowerCase() ===
        question.correctAnswer.trim().toLowerCase();
    }

    if (isCorrect) setScore((s) => s + 1);

    setSelectedOption("");
    setShortAnswer("");

    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div style={{ color: dashboardColors.sectionTitle }}>
        <h2 style={{ color: dashboardColors.title }}>Quiz Complete 🎉</h2>
        <p>
          Score: {score} / {quiz.questions.length}
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      <h2 style={{ color: dashboardColors.title }}>{quiz.title}</h2>

      <p style={{ fontWeight: 600 }}>
        Q{currentIndex + 1}: {question.question}
      </p>

      {/* Multiple choice */}
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
                backgroundColor:
                  selectedOption === opt ? "#d0e6ff" : "white",
                cursor: "pointer",
                textAlign: "left",
                color: dashboardColors.sectionTitle,
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

      {/* Short answer */}
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
            color: dashboardColors.sectionTitle,
          }}
        />
      )}

      {/* Next button */}
      <button
        onClick={handleNext}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          borderRadius: "10px",
          backgroundColor: dashboardColors.title,
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

export default QuizDisplay;