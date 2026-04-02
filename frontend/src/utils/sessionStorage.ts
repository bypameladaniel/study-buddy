import type { StudySession } from "../types/session";

const STORAGE_KEY = "studybuddy_sessions";

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
  const sessions = getSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.unshift(session);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function updateSession(
  id: string,
  updates: Partial<StudySession>
): void {
  const sessions = getSessions();
  const index = sessions.findIndex((s) => s.id === id);
  if (index >= 0) {
    sessions[index] = { ...sessions[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }
}

export function createSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatLastAccessed(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
