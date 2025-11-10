"use client";

import BingoBoard from "@/components/bingo/BingoBoard";
import ThemeSelect from "@/components/common/ThemeSelect";
import { useParams } from "next/navigation";

export default function BingoBoardPage() {
    const { id } = useParams();
    if (typeof id !== "string") return null;

    return (
        <div className="text-(--text-color-base) min-h-screen flex items-center justify-center p-4 mx-auto max-w-md">
            <div className="w-full">
                <header className="text-center mb-10">
                    <p className="mt-2 mb-5 text-xl">
                        하나씩 채워가며, 빙고를 완성해보세요!
                    </p>
                    <ThemeSelect />
                </header>
                <BingoBoard boardId={id} />
            </div>
        </div>
    );
}