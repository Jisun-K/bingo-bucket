import { create } from "zustand";

export type ThemeType = "default" | "pastel" | "green" | "blue";

interface ThemeState {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: "default",
    setTheme: (theme) => set({theme})
}));