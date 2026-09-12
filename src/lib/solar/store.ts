import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BodyId } from "./data";

type SolarState = {
  paused: boolean;
  speed: number;
  showLabels: boolean;
  showOrbits: boolean;
  focusedId: BodyId;
  hoveredId: BodyId | null;
  setPaused: (paused: boolean) => void;
  togglePaused: () => void;
  setSpeed: (speed: number) => void;
  setShowLabels: (show: boolean) => void;
  setShowOrbits: (show: boolean) => void;
  setFocusedId: (id: BodyId) => void;
  setHoveredId: (id: BodyId | null) => void;
};

export const useSolarStore = create<SolarState>()(
  persist(
    (set) => ({
      paused: false,
      speed: 1,
      showLabels: true,
      showOrbits: true,
      focusedId: "sun",
      hoveredId: null,
      setPaused: (paused) => set({ paused }),
      togglePaused: () => set((s) => ({ paused: !s.paused })),
      setSpeed: (speed) => set({ speed }),
      setShowLabels: (showLabels) => set({ showLabels }),
      setShowOrbits: (showOrbits) => set({ showOrbits }),
      setFocusedId: (focusedId) => set({ focusedId }),
      setHoveredId: (hoveredId) => set({ hoveredId }),
    }),
    {
      name: "helios-prefs",
      partialize: (s) => ({
        speed: s.speed,
        showLabels: s.showLabels,
        showOrbits: s.showOrbits,
      }),
    },
  ),
);

export function speedToSlider(speed: number) {
  const t = (Math.log(speed) - Math.log(0.125)) / (Math.log(16) - Math.log(0.125));
  return Math.min(1, Math.max(0, t));
}

export function sliderToSpeed(t: number) {
  return 0.125 * Math.pow(16 / 0.125, t);
}

export function formatSpeed(speed: number) {
  if (speed >= 9.5) return `${Math.round(speed)}×`;
  if (speed >= 1) return `${speed.toFixed(1)}×`;
  return `${speed.toFixed(2)}×`;
}
