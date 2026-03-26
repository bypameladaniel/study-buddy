const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = "llama-3.3-70b-versatile";

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
}

export async function sendMessage(messages: Message[]): Promise<string> {
  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.log("Full error:", error);
    throw new Error(error.error?.message || error.message || "Groq request failed");
  }

  const data: GroqResponse = await response.json();
  return data.choices[0].message.content;
}