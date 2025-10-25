"use client";

import { useDialog } from "@/hooks/useDialog";
import { nanoid } from "nanoid";
import { useState } from "react";

interface BingoItem {
    id: string;
    parentId: string;
    order: number;
    content: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function BingoGrid() {
    const dialog = useDialog();
    const initBingo: BingoItem[] = Array.from({ length: 9 }, (_, index) => ({
        id: nanoid(),
        parentId: 'sampleBingoId',
        order: index,
        content: '',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }));

    const [bingoItems, setBingoItems] = useState<BingoItem[]>(initBingo);
    const [inputValue, setInputValue] = useState<string>("");

    const handlAddItem = (id: number) => {
        dialog.open({
            type: "form",
            title: "목표 추가하기",
            description: "이루고 싶은 목표를 작성해서 빙고를 완성해보세요!",
            children: (
                <form>
                    <input
                        type="text"
                        placeholder="ex. 책 5권 읽기, 다이어트 성공하기 등등.."
                        className="w-full border p-2 rounded mb-4"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </form>
            ),
            confirmText: "추가",
            onConfirm: () => {
                if (inputValue.trim() === "") return;
                setBingoItems(prevItems => {
                    const newItems = [...prevItems];
                    newItems[id] = {
                        ...newItems[id],
                        content: inputValue,
                        updatedAt: new Date().toISOString(),
                    };
                    return newItems;
                });
                setInputValue("");
            }
        });
    };

    return (
        <>
            <div className="grid gap-2 grid-cols-3">
                {bingoItems.map((item, idx) => (
                    <div key={idx} className="aspect-square rounded-lg border-2 transition-all duration-300 cursor-pointer">
                        <div className="p-3 flex flex-col items-center justify-center text-center h-full"
                            onClick={() => handlAddItem(idx)}>
                            <p className="text-muted-foreground text-sm">
                                {item.content || "+"}
                            </p>
                        </div>
                    </div>
                ))}

                {/* <div className="aspect-square rounded-lg border-2 transition-all duration-300 cursor-pointer">
                <div className="p-3 flex flex-col items-center justify-center text-center h-full">
                    <p className="text-muted-foreground text-sm">
                        클릭하여 추가
                    </p>
                </div>
            </div> */}

            </div>
        </>
    );
}