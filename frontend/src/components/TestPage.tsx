import { useState } from "react";
import { generateSummary, generateKeyPoints } from "../LLMServices/prompts";

type Action = "summarize" | "keypoints";

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
      setOutput(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px", fontFamily: "monospace" }}>
      <h1>🧪 API Test Page</h1>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste your study material here..."
        rows={10}
        style={{ width: "100%", padding: 12, fontSize: 14, boxSizing: "border-box" }}
      />

      <div style={{ display: "flex", gap: 10, margin: "12px 0" }}>
        {(["summarize", "keypoints"] as Action[]).map(action => (
          <button
            key={action}
            onClick={() => handleAction(action)}
            disabled={loading || !input.trim()}
            style={{ padding: "8px 16px", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading && activeAction === action ? "Loading..." : action}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ background: "#fee", border: "1px solid red", padding: 12, marginBottom: 12 }}>
          ❌ <strong>Error:</strong> {error}
        </div>
      )}

      {output && (
        <div>
          <strong>Response ({activeAction ?? "result"}):</strong>
          <pre style={{ background: "#f4f4f4", padding: 16, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}