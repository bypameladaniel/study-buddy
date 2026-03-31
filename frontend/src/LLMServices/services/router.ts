import type { Models } from "./models";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL: Models = "llama-3.3-70b-versatile";
const MAX_TOKENS = 4000;

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface GroqResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
  error?: {
    message: string;
    type: string;
    code: string;
  };
}

export async function sendMessage(messages: Message[]): Promise<string> {
  if (!API_KEY) {
    throw new Error("Missing Groq API key. Check your .env file.");
  }

  let response: Response;

  try {
    response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: MAX_TOKENS,
      }),
    });
  } catch (networkError) {
    throw new Error("Network error — check your internet connection.");
  }

  const data: GroqResponse = await response.json();

  if (!response.ok) {
    console.error("Groq API error:", data);
    throw new Error(data.error?.message || "Groq request failed");
  }

  if (!data.choices || data.choices.length === 0) {
    throw new Error("No response returned from Groq.");
  }

  return data.choices[0].message.content;
}