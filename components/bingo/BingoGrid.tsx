"use client";

import { useModal } from "@/hooks/useModal";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BingoInputForm } from "./BingoInputForm";
import BingoGridItem from "./BingoGridItem";

interface BingoItem {
    id: string;
    order: number; // 그리드 칸 순서
    parentId: string;
    content: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function BingoGrid() {
    const modal = useModal();
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

    const handleEditItem = (item: BingoItem) => {
        modal.open({
            title: "목표 추가하기",
            description: "이루고 싶은 목표를 작성해서 빙고를 완성해보세요!",
            children: (
                <BingoInputForm
                    initValue={item.content}
                    onSubmit={(value) => { handlSubmit(item.order, value) }}
                    onCancel={() => modal.close()}
                />
            )
        });
    }

    const handleDeleteItem = (id: string) => {
        setBingoItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                return {
                    id: nanoid(),
                    parentId: 'sampleBingoId',
                    order: item.order,
                    content: '',
                    completed: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
            }
            return item;
        }));
    }

    const handlSubmit = (order: number, value: string) => {
        setBingoItems(prevItems => {
            const newItems = [...prevItems];
            newItems[order] = {
                ...newItems[order],
                content: value,
                updatedAt: new Date().toISOString(),
            };
            return newItems;
        });
        modal.close();
    }

    const handlAddItem = (item: BingoItem) => {
        modal.open({
            title: "목표 추가하기",
            description: "이루고 싶은 목표를 작성해서 빙고를 완성해보세요!",
            children: (
                <BingoInputForm
                    initValue={item.content}
                    onSubmit={(value) => { handlSubmit(item.order, value) }}
                    onCancel={() => modal.close()}
                />
            )
        });
    };


    return (
        <div className="grid gap-2 grid-cols-3">
            {bingoItems.map((item, idx) => (
                <BingoGridItem
                    key={idx}
                    order={item.order}
                    content={item.content}
                    onClick={() => handlAddItem(item)}
                    onEdit={() => handleEditItem(item)}
                    onDelete={() => handleDeleteItem(item.id)}
                />
            ))}
        </div>
    );
}