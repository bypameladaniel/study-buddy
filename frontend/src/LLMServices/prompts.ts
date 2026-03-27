import { sendMessage } from "./router";

export async function generateSummary(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content: "You are a study assistant, where your job is to carefully read through my class material and generate me a summarie of my topics. You make them structures, consies, but also never miss important information."
        },
        {
            role: "user",
            content: `In order to generate the best possible summary of my study material please follow these steps:\n
            1. Read through the material\n
            2. Clealry orginaize the topics\n
            3. Generate clear and understandable summeries of each topic.\n\n
            Here is the study material:\n${studyMaterial}`
        }
    ])
}

export async function generateKeyPoints(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content:  "You are a study assistant, where your job is to carefully read through my class material and outline the key points from study material."
        },
        {
            role: "user",
            content: `I have an exam comming up where I need your help to understand the overview of all the topics. Please go through the course material and generate me key points that I should know for my exam. Please be clear and consise.\n
            Here is the study material: \n${studyMaterial}`
        }
    ])
}

export async function generateQuiz(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content: "You are my personal study assistant. Your job is to take my study material and create practice quizzes with miltiple choice and short answer questions."
        },
        {
            role: "user",
            content: `Your job is to help me prepare for my exam by creating a practice quiz based on my study material. Please follow these steps\n:
            1. Read through my study material\n
            2. Create a clean formatted template exam style.\n
            2. Make questions that highlight the important aspects that I should know.\n
            3. Ensure that the questions cover all my study material\n
            4. Generate the answer key at the end.\n\n
            Here is my study material:\n\n${studyMaterial}`
        }
    ])
}

export async function generateFlashCards(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content: "You are a personal tutor preparing me for my exams. Your job is to create flashcards based on my study material"
        },
        {
            role: "user",
            content: `I have to prepare for my exam and i need you to generaye me some flashcards. Please follow these steps:
            1. Read the study material\n
            2. Generate questions to cover all the material
            3. Format the output as: Q: "Your generated question" | A: "Your generated answer"\n\n
            Here is my study material:\n\n${studyMaterial}`
        }
    ])
}

