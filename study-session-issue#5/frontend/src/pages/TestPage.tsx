import { useState } from "react";
import {
  generateSummary,
  generateKeyPoints,
  generateFlashCards,
  generateQuiz,
} from "../LLMServices/services/prompts";
import ReactMarkdown from "react-markdown";
import { encodingForModel } from "js-tiktoken";

import { parseSummary } from "../LLMServices/parsers/summaryParser";
import { parseKeyPoints } from "../LLMServices/parsers/keypointsParser";
import { parseFlashcards } from "../LLMServices/parsers/flashcardParser";
import { parseQuiz } from "../LLMServices/parsers/quizParser";

type Action = "summarize" | "keypoints" | "flashcards" | "quizzes";

export default function TestPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [parsedOutput, setParsedOutput] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<Action | null>(null);
  const [error, setError] = useState("");

  const parseContent = (action: Action, raw: string) => {
    switch (action) {
      case "summarize":
        return parseSummary(raw);
      case "keypoints":
        return parseKeyPoints(raw);
      case "flashcards":
        return parseFlashcards(raw);
      case "quizzes":
        return parseQuiz(raw);
      default:
        return null;
    }
  };

  const handleAction = async (action: Action) => {
    if (!input.trim()) return;

    setLoading(true);
    setActiveAction(action);
    setOutput("");
    setParsedOutput(null);
    setError("");

    try {
      let result = "";

      if (action === "summarize") result = await generateSummary(input);
      if (action === "keypoints") result = await generateKeyPoints(input);
      if (action === "flashcards") result = await generateFlashCards(input);
      if (action === "quizzes") result = await generateQuiz(input);

      setOutput(result);

      const parsed = parseContent(action, result);
      setParsedOutput(parsed);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  const countTokens = (text: string): number => {
    const enc = encodingForModel("gpt-4");
    const tokens = enc.encode(text);
    return tokens.length;
  };

  const tokenCount = countTokens(input);
  const MAX_TOKENS_INPUT = 8000;
  const isTooLong = tokenCount > MAX_TOKENS_INPUT;

  return (
    <div
      style={{
        maxWidth: 1200,
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
          marginBottom: 12,
        }}
      />

      <div style={{ display: "flex", gap: 10, margin: "12px 0", flexWrap: "wrap" }}>
        {(["summarize", "keypoints", "flashcards", "quizzes"] as Action[]).map(
          (action) => (
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
          )
        )}
      </div>

      <p style={{ margin: "8px 0", color: isTooLong ? "red" : "#555" }}>
        Tokens: {tokenCount}/{MAX_TOKENS_INPUT}
      </p>

      {isTooLong && (
        <p style={{ color: "red", margin: "8px 0" }}>
          Input is too long ({tokenCount}/{MAX_TOKENS_INPUT} tokens). Please
          shorten your study material.
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

      {(output.length > 0 || parsedOutput !== null) && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 20,
          }}
        >
          <div>
            <strong>Raw LLM Response:</strong>
            <div
              style={{
                background: "#f4f4f4",
                padding: 16,
                borderRadius: 8,
                minHeight: 300,
                overflowX: "auto",
              }}
            >
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          </div>

          <div>
            <strong>Parsed Output:</strong>
            <div
              style={{
                background: "#f4f4f4",
                padding: 16,
                borderRadius: 8,
                minHeight: 300,
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {parsedOutput
                ? JSON.stringify(parsedOutput, null, 2)
                : "No parsed output available."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}