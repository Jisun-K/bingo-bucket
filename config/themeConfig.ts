
export const THEMES = [
    "default", "moss", "pinkbeige", "dawn",
    "midnight", "forest", "nebula"
] as const;

export const THEME_CONFIG = {
    default: { color: "#1A1A1A", type: "ligth" },
    pinkbeige: { color: "#C2A2A8", type: "ligth" },
    dawn: { color: "#2E3440", type: "ligth" },
    moss: { color: "#495C4A", type: "ligth" },
    forest: { color: "#E8EDE8", type: "dark" },
    midnight: { color: "#E5E7EB", type: "dark" },
    nebula: { color: "#B7B9D6", type: "dark" },
}

export const THEME_LIST = Object.entries(THEME_CONFIG).map(([key, value]) => ({
    name: key as ThemeType,
    ...value,
}));

export type ThemeType = keyof typeof THEME_CONFIG;

export const isDarkTheme = (theme: ThemeType | string) => {
    const config = THEME_CONFIG[theme as ThemeType];
    return config ? config.type === "dark" : false;
};