import type { StudySession } from "../types/session";

const STORAGE_KEY = "gogofast_sessions";

export function getSessions(): StudySession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudySession[]) : [];
  } catch {
    return [];
  }
}

export function getSession(id: string): StudySession | null {
  return getSessions().find((s) => s.id === id) ?? null;
}

export function saveSession(session: StudySession): void {
  const sessions = getSessions().filter((s) => s.id !== session.id);
  sessions.push(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function updateSession(
  id: string,
  updates: Partial<Omit<StudySession, "id">>
): void {
  const sessions = getSessions().map((s) =>
    s.id === id ? { ...s, ...updates } : s
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function createSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatLastAccessed(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay === 1) return "Yesterday";
  return `${diffDay} days ago`;
}
