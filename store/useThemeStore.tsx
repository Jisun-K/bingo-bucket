import { ThemeType } from "@/config/themeConfig";
import { create } from "zustand";

interface ThemeState {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: "default",
    setTheme: (theme) => set({theme})
}));