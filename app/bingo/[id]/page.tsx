"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BingoBoard from "@/components/bingo/BingoBoard";
import ThemeSelect from "@/components/common/ThemeSelect";
import { BingoSheet } from "@/components/bingo/BingoSheet";

import { useBingoBoard } from "@/hooks/useBingoBoard";
import { useThemeEffect } from "@/hooks/useThemeEffect";

export default function BingoBoardPage() {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    if (typeof id !== "string") return null;

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const { board, updateBoard } = useBingoBoard(id);
    const currentTheme = isLoaded ? board?.theme || 'default' : 'default';
    useThemeEffect(currentTheme);

    return (
        <div className="text-(--text-color-base) min-h-screen flex items-center p-4 mx-auto max-w-md">
            <div className="w-full">
                <header className="flex items-center justify-end mb-10">
                    <BingoSheet theme={currentTheme} />
                </header>
                <div className="text-center mb-10">
                    <p className="mt-2 mb-5 text-xl">
                        하나씩 채워가며, 빙고를 완성해보세요!
                    </p>
                    <ThemeSelect
                        currTheme={currentTheme}
                        onThemeChange={(newTheme) => updateBoard((prev) => ({ theme: newTheme }))} />
                </div>
                <BingoBoard boardId={id} />
            </div>
        </div>
    );
}