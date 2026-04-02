export interface Flashcard {
  question: string;
  answer: string;
}

export function parseFlashcards(rawResponse: string): Flashcard[] {
  if (!rawResponse || typeof rawResponse !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(rawResponse);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.reduce<Flashcard[]>((acc, item) => {
      if (
        item &&
        typeof item.question === "string" &&
        typeof item.answer === "string"
      ) {
        const question = item.question.trim();
        const answer = item.answer.trim();

        if (question && answer) {
          acc.push({ question, answer });
        }
      }

      return acc;
    }, []);
  } catch (error) {
    console.error("Failed to parse flashcards:", error);
    return [];
  }
}