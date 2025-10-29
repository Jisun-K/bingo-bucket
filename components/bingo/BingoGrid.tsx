"use client";

import { useModal } from "@/hooks/useModal";
import { nanoid } from "nanoid";
import { useState } from "react";
import { BingoInputForm } from "./BingoInputForm";
import BingoGridItem from "./BingoGridItem";
import { time } from "console";

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
        createdAt: '',
        updatedAt: '',
    }));

    const [bingoItems, setBingoItems] = useState<BingoItem[]>(initBingo);

    const openBingoInputModal = (isEdit: boolean, title: string, initValue: string, onSubmit: (value: string) => void) => {
        modal.open({
            title,
            description: "이루고 싶은 목표를 작성해서 빙고를 완성해보세요!",
            children: (
                <BingoInputForm
                    initValue={initValue}
                    isEdit={isEdit}
                    onSubmit={(value) => {
                        onSubmit(value);
                        modal.close();
                    }}
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
                    createdAt: '',
                    updatedAt: '',
                };
            }
            return item;
        }));
    }

    const handleEditItem = (item: BingoItem) => {
        openBingoInputModal(true, "목표 수정하기", item.content, (value) => {
            setBingoItems(prevItems =>
                prevItems.map(_item =>
                    _item.id === item.id
                        ? {
                            ..._item,
                            content: value,
                            updatedAt: new Date().toISOString(),
                        }
                        : _item
                )
            );
        });
    }

    const handleAddItem = (item: BingoItem) => {
        openBingoInputModal(false, "목표 추가하기", item.content, (value) => {
            setBingoItems(prevItems =>
                prevItems.map(_item =>
                    _item.id === item.id
                        ? {
                            ..._item,
                            content: value,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        }
                        : _item
                )
            );
        });
    };


    return (
        <div className="grid gap-2 grid-cols-3">
            {bingoItems.map((item, idx) => (
                <BingoGridItem
                    key={idx}
                    order={item.order}
                    content={item.content}
                    onClick={() => handleAddItem(item)}
                    onEdit={() => handleEditItem(item)}
                    onDelete={() => handleDeleteItem(item.id)}
                />
            ))}
        </div>
    );
}