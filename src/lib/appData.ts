export type AppCategory = "doomscroll" | "productive" | "neutral";

export interface AppEntry {
  id: string;
  name: string;
  hours: number;
  minutes: number;
  category: AppCategory;
  color: string;
  icon: string; // lucide name
}

export const DEFAULT_APPS: Omit<AppEntry, "hours" | "minutes">[] = [
  { id: "yt", name: "YouTube", category: "doomscroll", color: "#FF0000", icon: "Play" },
  { id: "netflix", name: "Netflix", category: "doomscroll", color: "#E50914", icon: "Film" },
  { id: "x", name: "X (Twitter)", category: "doomscroll", color: "#fff", icon: "Bird" },
  { id: "linkedin", name: "LinkedIn", category: "productive", color: "#0A66C2", icon: "Briefcase" },
  { id: "meta", name: "Meta", category: "doomscroll", color: "#0866FF", icon: "Facebook" },
  { id: "telegram", name: "Telegram", category: "neutral", color: "#26A5E4", icon: "Send" },
  { id: "whatsapp", name: "WhatsApp", category: "neutral", color: "#25D366", icon: "MessageCircle" },
  { id: "instagram", name: "Instagram", category: "doomscroll", color: "#E4405F", icon: "Camera" },
  { id: "snapchat", name: "Snapchat", category: "doomscroll", color: "#FFFC00", icon: "Ghost" },
];

export function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

export function totalMinutes(e: AppEntry) {
  return e.hours * 60 + e.minutes;
}
export function minutesToHM(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return { h, m };
}
export function formatHM(mins: number) {
  const { h, m } = minutesToHM(mins);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
