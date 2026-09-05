import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_APPS, makeId, type AppCategory, type AppEntry } from "../lib/appData";

interface Store {
  apps: AppEntry[];
  setTime: (id: string, hours: number, minutes: number) => void;
  setCategory: (id: string, category: AppCategory) => void;
  addCustom: (name: string) => void;
  remove: (id: string) => void;
  reset: () => void;
}

function seed(): AppEntry[] {
  return DEFAULT_APPS.map((a) => ({ ...a, hours: 0, minutes: 0 }));
}

export const useScreenTimeStore = create<Store>()(
  persist(
    (set) => ({
      apps: seed(),
      setTime: (id, hours, minutes) =>
        set((s) => ({
          apps: s.apps.map((a) =>
            a.id === id ? { ...a, hours: Math.max(0, Math.min(168, hours)), minutes: Math.max(0, Math.min(59, minutes)) } : a
          ),
        })),
      setCategory: (id, category) =>
        set((s) => ({ apps: s.apps.map((a) => (a.id === id ? { ...a, category } : a)) })),
      addCustom: (name) =>
        set((s) => ({
          apps: [
            ...s.apps,
            { id: makeId(), name: name.trim().slice(0, 24), hours: 0, minutes: 0, category: "neutral", color: "#8B5CF6", icon: "AppWindow" },
          ],
        })),
      remove: (id) => set((s) => ({ apps: s.apps.filter((a) => a.id !== id) })),
      reset: () => set({ apps: seed() }),
    }),
    { name: "screentime:v1" }
  )
);
