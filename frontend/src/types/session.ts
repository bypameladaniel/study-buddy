export interface StudySession {
  id: string;
  title: string;
  studyMaterial: string;
  outputs: {
    summary: string;
    quiz: string;
    flashcards: string;
    keypoints: string;
  };
  createdAt: number;
  lastAccessedAt: number;
  isCompleted: boolean;
}
