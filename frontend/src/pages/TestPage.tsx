import { useState } from "react";
import { generateSummary, generateKeyPoints, generateFlashCards, generateQuiz } from "../LLMServices/prompts";
import ReactMarkdown from "react-markdown";
import { encodingForModel } from "js-tiktoken";

type Action = "summarize" | "keypoints" | "flashcards" | "quizzes";

export default function TestPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<Action | null>(null);
  const [error, setError] = useState("");

  const handleAction = async (action: Action) => {
    if (!input.trim()) return;
    setLoading(true);
    setActiveAction(action);
    setOutput("");
    setError("");

    try {
      let result = "";
      if (action === "summarize") result = await generateSummary(input);
      if (action === "keypoints") result = await generateKeyPoints(input);
      if (action === "flashcards") result = await generateFlashCards(input);
      if (action === "quizzes") result = await generateQuiz(input);
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  const countTokens = (text: string): number => {
    const enc = encodingForModel("gpt-4"); // close enough for Llama
    const tokens = enc.encode(text);
    return tokens.length;
  };

  const tokenCount = countTokens(input);
  const MAX_TOKENS_INPUT = 8000;
  const isTooLong = tokenCount > MAX_TOKENS_INPUT;

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "monospace",
      }}
    >
      <h1>🧪 API Test Page</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your study material here..."
        rows={10}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 14,
          boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", gap: 10, margin: "12px 0" }}>
        {(["summarize", "keypoints", "flashcards", "quizzes"] as Action[]).map((action) => (
          <button
            key={action}
            onClick={() => handleAction(action)}
            disabled={loading || !input.trim() || isTooLong}
            style={{
              padding: "8px 16px",
              cursor: loading || isTooLong ? "not-allowed" : "pointer",
            }}
          >
            {loading && activeAction === action ? "Loading..." : action}
          </button>
        ))}
      </div>
      

      {isTooLong && (
  <p style={{ color: "red", margin: "8px 0" }}>
     Input is too long ({tokenCount}/{MAX_TOKENS_INPUT} tokens). Please shorten your study material.
  </p>
)}

      {error && (
        <div
          style={{
            background: "#fee",
            border: "1px solid red",
            padding: 12,
            marginBottom: 12,
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {output && (
        <div>
          <strong>Response:</strong>
          <div style={{ background: "#f4f4f4", padding: 16, borderRadius: 8 }}>
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
