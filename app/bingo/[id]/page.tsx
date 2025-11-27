"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import BingoBoard from "@/components/bingo/BingoBoard";
import ThemeSelect from "@/components/common/ThemeSelect";
import { BingoSheet } from "@/components/bingo/BingoSheet";

import { useBingoBoard } from "@/hooks/useBingoBoard";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { useBingoStore } from "@/store/useBingoStore";

export default function BingoBoardPage() {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const { setLastActiveBingoBoardId } = useBingoStore();
    if (typeof id !== "string") return null;

    useEffect(() => {
        setIsLoaded(true);
        if (typeof id === "string") {
            setLastActiveBingoBoardId(id);
        };
    }, [id, setLastActiveBingoBoardId]);

    const safeId = typeof id === "string" ? id : "";
    const { board, updateBoard } = useBingoBoard(safeId);

    const currentTheme = isLoaded && board?.theme ? board.theme : 'default';
    useThemeEffect(currentTheme);

    if (!isLoaded) {
        return null;
    }

    return (
        <div className="relative text-(--text-color-base) min-h-screen flex items-center p-4 mx-auto max-w-md">
            <div className="w-full">
                <div className="absolute top-15 right-4">
                    <BingoSheet theme={currentTheme}/>
                </div>
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