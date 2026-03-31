export interface MultipleChoiceQuestion {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ShortAnswerQuestion {
  type: "short-answer";
  question: string;
  correctAnswer: string;
}

export type QuizQuestion = MultipleChoiceQuestion | ShortAnswerQuestion;

export interface StudyQuiz {
  title: string;
  questions: QuizQuestion[];
}

export function parseQuiz(rawResponse: string): StudyQuiz | null {
  if (!rawResponse || typeof rawResponse !== "string") {
    return null;
  }

  try {
    const parsed = JSON.parse(rawResponse);

    if (
      !parsed ||
      typeof parsed.title !== "string" ||
      !Array.isArray(parsed.questions)
    ) {
      return null;
    }

    const cleanQuestions: QuizQuestion[] = parsed.questions.reduce(
      (acc: QuizQuestion[], item: any) => {
        if (!item || typeof item.question !== "string" || typeof item.correctAnswer !== "string") {
          return acc;
        }

        const question = item.question.trim();
        const correctAnswer = item.correctAnswer.trim();

        if (!question || !correctAnswer || typeof item.type !== "string") {
          return acc;
        }

        if (item.type === "multiple-choice") {
          if (
            Array.isArray(item.options) &&
            item.options.length === 4 &&
            item.options.every((option: any) => typeof option === "string" && option.trim().length > 0)
          ) {
            acc.push({
              type: "multiple-choice",
              question,
              options: item.options.map((option: string) => option.trim()),
              correctAnswer,
            });
          }
        }

        if (item.type === "short-answer") {
          acc.push({
            type: "short-answer",
            question,
            correctAnswer,
          });
        }

        return acc;
      },
      []
    );

    return {
      title: parsed.title.trim(),
      questions: cleanQuestions,
    };
  } catch (error) {
    console.error("Failed to parse quiz:", error);
    return null;
  }
}