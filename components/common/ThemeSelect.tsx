// components/common/ThemeSelect.tsx
import { THEME_LIST, ThemeType } from "@/config/themeConfig";
import { useThemeStore } from "@/store/useThemeStore";

export default function ThemeSelect() {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="flex gap-3 justify-center">
            {THEME_LIST.map(({ name, color }) => (
                <button
                    key={name}
                    onClick={() => setTheme(name as ThemeType)}
                    className={`relative w-8 h-8 rounded-xl transition-all duration-300 border-2 border-white
                                hover:scale-105 focus:outline-none
            ${theme === name ? "ring-2 ring-offset-2 ring-black" : ""}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Switch to ${name} theme`}
                />
            ))}
        </div>
    );
}