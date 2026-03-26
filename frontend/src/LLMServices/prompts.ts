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
            content: ""
        },
        {
            role: "user",
            content: `Generate a quiz from this study material:\n\n${studyMaterial}`
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
            content: `Generate flashcards with this study material:\n\n${studyMaterial}`
        }
    ])
}

