export interface StudySession {
  id: string;
  title: string;
  studyMaterial: string;
  outputs: {
    summary: string;
    quiz: string;
    flashcards: string;
  };
  createdAt: number;       // Unix ms timestamp
  lastAccessedAt: number;  // Unix ms timestamp
}
