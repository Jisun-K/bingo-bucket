
export const THEMES = [
    "default",  "moss", "pinkbeige", "dawn", 
    "midnight", "forest","nebula"
] as const;

export const THEME_CONFIG = {
    default: { name: "default", color: "#1A1A1A" },
    pinkbeige: { name: "pinkbeige", color: "#C2A2A8" },
    dawn: { name: "dawn", color: "#2E3440" },
    moss: { name: "moss", color: "#495C4A" },
    forest: { name: "forest", color: "#E8EDE8" },
    midnight: { name: "midnight", color: "#E5E7EB" },
    nebula: { name: "nebula", color: "#B7B9D6" },
}

export type ThemeType = keyof typeof THEME_CONFIG;
export const THEME_LIST = Object.values(THEME_CONFIG);
