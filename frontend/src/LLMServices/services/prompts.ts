import { sendMessage } from "./router";

export async function generateSummary(studyMaterial: string): Promise<string> {
  return sendMessage([
    {
      role: "system",
      content:
        "You are a study assistant. Your job is to carefully read study material and generate clear, structured summaries to help students prepare for exams.",
    },
    {
      role: "user",
      content: `Read the study material and generate a structured summary.

                Return ONLY valid JSON in this exact format:
                {
                "title": "Short overall title",
                "sections": [
                    {
                    "heading": "Section heading",
                    "content": "Clear and concise explanation of the topic"
                    }
                ]
                }

                Rules:
                - Do not include markdown
                - Do not include code fences
                - Do not include extra text
                - Organize the material into logical sections
                - Each section should represent an important topic
                - Keep explanations concise but informative
                - Do not miss key concepts
                - Avoid repeating the same idea
                - Use simple and clear language for studying

                Here is the study material:
                ${studyMaterial}`,
    },
  ]);
}

export async function generateKeyPoints(
  studyMaterial: string,
): Promise<string> {
  return sendMessage([
    {
      role: "system",
      content:
        "You are a study assistant. Your job is to carefully read study material and extract the most important ideas a student should know for an exam.",
    },
    {
      role: "user",
      content: `Read the study material and generate exam key points.

                Return ONLY valid JSON in this exact format:
                {
                "title": "Short topic title",
                "overview": "A short 1-2 sentence overview of the material",
                "keyPoints": [
                    "Key point 1",
                    "Key point 2",
                    "Key point 3"
                ]
                }

                Rules:
                - Do not include markdown
                - Do not include code fences
                - Do not include extra text
                - Keep the overview short and clear
                - Each key point should be concise but meaningful
                - Focus on the most important concepts a student should remember for an exam
                - Avoid repeating the same idea in different words

                Here is the study material:
                ${studyMaterial}`,
    },
  ]);
}

export async function generateQuiz(studyMaterial: string): Promise<string> {
  return sendMessage([
    {
      role: "system",
      content:
        "You are my personal study assistant. Your job is to create practice quizzes based on my study material.",
    },
    {
      role: "user",
      content: `Read my study material and generate a study quiz.

                Return ONLY valid JSON in this exact format:
                {
                "title": "Quiz title",
                "questions": [
                    {
                    "type": "multiple-choice",
                    "question": "Question text",
                    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                    "correctAnswer": "Correct option text"
                    },
                    {
                    "type": "short-answer",
                    "question": "Question text",
                    "correctAnswer": "Correct answer text"
                    }
                ]
                }

                Rules:
                - Do not include markdown
                - Do not include code fences
                - Do not include extra text
                - Include both multiple-choice and short-answer questions
                - Make sure the questions cover the important material
                - For multiple-choice questions, always include exactly 4 options
                - Store the answer directly in the question object

                Here is my study material:

                ${studyMaterial}`,
    },
  ]);
}

export async function generateFlashCards(
  studyMaterial: string,
): Promise<string> {
  return sendMessage([
    {
      role: "system",
      content:
        "You are a personal tutor preparing me for my exams. Your job is to create flashcards based on my study material",
    },
    {
      role: "user",
      content: `I have to prepare for my exam and i need you to generaye me some flashcards. 
            Please:
            1. Read the study material
            2. Generate flashcards that cover the important material
            3. Return ONLY valid JSON in this exact format:
            [
            { "question": "Question 1", "answer": "Answer 1" },
            { "question": "Question 2", "answer": "Answer 2" }
            ]

            Do not include markdown, code fences, or any extra text.

            Here is my study material:
            ${studyMaterial}`,
    },
  ]);
}
