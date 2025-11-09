"use client";

import { useEffect, useState } from "react";
import { useBingoStore } from "@/store/useBingoStore";
import BingoBoard from "@/components/bingo/BingoBoard";
import ThemeSelect from "@/components/common/ThemeSelect";
import { useBingoBoard } from "@/hooks/useBingoBoard";

export default function Home() {
    const { ensureBingoBoard } = useBingoStore();
    const [boardId, setBoardId] = useState<string>("");
    const [size, setSize] = useState<number>(3);

    useEffect(() => {
        const id = ensureBingoBoard(size);
        setBoardId(id);
    }, []);

    const { changeSize } = useBingoBoard(boardId);

    const handleSizeChange =(size: number) => {
        setSize(size);
        changeSize(size)
    } 

    if (!boardId) { return null; }

    return (
        <div className="text-(--text-color-base) min-h-screen flex items-center justify-center p-4 mx-auto max-w-md">
            <div className="w-full">
                <header className="text-center mb-10">
                    <div className="flex">
                        <button onClick={() =>  handleSizeChange(3)}>3x3</button>
                        <button onClick={() => handleSizeChange(5)}>5x5</button>
                    </div>
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
