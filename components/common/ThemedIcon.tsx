import { isDarkTheme, ThemeType } from "@/config/themeConfig";
import clsx from "clsx";

interface ThemedIconProps {
    icon: string;
    alt: string;
    theme: ThemeType;
    style?: string;
} 

export default function ThemedIcon({ icon, alt, theme, style = "w-5 h-5" }: ThemedIconProps) {
    const isDark = isDarkTheme(theme);
    
    return (
        <img
            src={icon}
            alt={alt}
            className={clsx(
                "transition-all duration-100",
                style,
                isDark && "invert"
            )}
        />
    );
}