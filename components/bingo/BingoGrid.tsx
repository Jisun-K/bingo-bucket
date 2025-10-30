"use client";

import { useModalStore } from "@/store/useModalStore";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BingoInputForm } from "./BingoInputForm";
import BingoGridItem from "./BingoGridItem";
import { time } from "console";

export interface BingoItem {
    id: string;
    order: number; // 그리드 칸 순서
    parentId: string;
    content: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function BingoGrid() {
    const modal = useModalStore();
    const initBingo: BingoItem[] = Array.from({ length: 9 }, (_, index) => ({
        id: nanoid(),
        parentId: 'sampleBingoId',
        order: index,
        content: '',
        isCompleted: false,
        createdAt: '',
        updatedAt: '',
    }));

    const [bingoItems, setBingoItems] = useState<BingoItem[]>(initBingo);

    const openBingoInputModal = (isEdit: boolean, title: string, item: BingoItem) => {
        modal.open({
            title,
            description: "이루고 싶은 목표를 작성해서 빙고를 완성해보세요!",
            children: (
                <BingoInputForm
                    initValue={item.content}
                    isEdit={isEdit}
                    onSubmit={(value) => { handleSubmit(item.id, value, isEdit) }}
                    onCancel={() => modal.close()}
                />
            )
        });
    }

    const handleSubmit = (id: string, value: string, isEdit: boolean) => {
        setBingoItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? {
                        ...item,
                        content: value,
                        createdAt: isEdit ? item.createdAt : new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                    : item
            )
        );
        modal.close();
    };

    const handleToggleComplete = (id: string) => {
        setBingoItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? {
                        ...item,
                        isCompleted: !item.isCompleted,
                        updatedAt: new Date().toISOString(),
                    }
                    : item
            )
        );
    };

    const handleDeleteItem = (id: string) => {
        setBingoItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    content: '',
                    isCompleted: false,
                    createdAt: '',
                    updatedAt: '',
                };
            }
            return item;
        }));
    }

    const handleAddItem = (item: BingoItem) => { openBingoInputModal(false, "목표 추가하기", item); }
    const handleEditItem = (item: BingoItem) => { openBingoInputModal(true, "목표 수정하기", item); }

    return (
        <div className="grid gap-4 grid-cols-3">
            {bingoItems.map((item) => (
                <BingoGridItem
                    key={item.id}
                    item={item}
                    onAdd={() => handleAddItem(item)}
                    onEdit={() => handleEditItem(item)}
                    onDelete={() => handleDeleteItem(item.id)}
                    onToggleComplete={() => handleToggleComplete(item.id)}
                />
            ))}
        </div>
    );
}