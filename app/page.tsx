"use client";

import BingoGrid from "@/components/bingo/BingoGrid";
import { useBingoStore } from "@/store/useBingoStore";
import { useEffect, useState } from "react";

export default function Home() {
    const { ensureBingoBoard } = useBingoStore();    
    const [boardId, setBoardId] = useState<string>("");
    useEffect(() => {
        const id = ensureBingoBoard(3);
        setBoardId(id);
    }, []);
    
    if(!boardId) {return null;}

    return (
        <div className="min-h-screen flex items-center justify-center p-4 mx-auto max-w-md">
            <div className="w-full">
                <header className="text-center mb-8">
                    <p className="mt-2 ">
                        하나씩 이루며, 완성해가는 나의 빙고!
                    </p>
                </header>
                <BingoGrid boardId={boardId} />
            </div>
        </div>

    );
}
