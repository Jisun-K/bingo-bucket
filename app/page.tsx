"use client";

import { useEffect, useState } from "react";
import { useBingoStore } from "@/store/useBingoStore";
import BingoBoard from "@/components/bingo/BingoBoard";
import ThemeSelect from "@/components/common/ThemeSelect";

export default function Home() {
    const { ensureBingoBoard } = useBingoStore();    

    const [boardId, setBoardId] = useState<string>("");

    useEffect(() => {
        const id = ensureBingoBoard(3);
        setBoardId(id);
    }, []);
    
    if(!boardId) {return null;}

    return (
        <div className="text-(--text-color-base) min-h-screen flex items-center justify-center p-4 mx-auto max-w-md">
            <div className="w-full">
                <header className="text-center mb-10">
                    <p className="mt-2 mb-5 text-xl">
                        하나씩 채워가며, 빙고를 완성해보세요!
                    </p>
                    <ThemeSelect />
                </header>
                <BingoBoard boardId={boardId} />
            </div>
        </div>

    );
}
