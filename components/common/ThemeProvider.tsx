"use client";

import { useThemeStore } from "@/store/useThemeStore";
import React, { useEffect } from "react";

export default function ThemeProvider({children} : {children: React.ReactNode}) {
    const { theme } =  useThemeStore();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return <>{children}</>
}