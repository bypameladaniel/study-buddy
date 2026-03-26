import { sendMessage } from "./openrouter";

export async function generateSummary(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content: ""
        },
        {
            role: "user",
            content: ""

        }
    ])
}

export async function generateKeyPoints(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content: ""
        },
        {
            role: "user",
            content: ""
        }
    ])
}

export async function generateQuiz(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content: ""
        },
        {
            role: "user",
            content: ""
        }
    ])
}

export async function generateFlashCards(studyMaterial: string): Promise<string>{
    return sendMessage([
        {
            role: "system",
            content: ""
        },
        {
            role: "user",
            content: ""
        }
    ])
}

