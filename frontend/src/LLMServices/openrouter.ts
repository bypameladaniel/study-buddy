const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = "mistralai/mistral-7b-instruct:free";


//prompt format that will be sent
export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}


//what will be returned from the request
export interface OpenRouterResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

export async function sendMessage(messages: Message[]): Promise<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
    }),
  });

  //either token is expired or the rate limit was exceeded (only use free models!!!)
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "OpenRouter request failed");
  }

  //get just the AI response
  const data: OpenRouterResponse = await response.json();
  return data.choices[0].message.content;
}