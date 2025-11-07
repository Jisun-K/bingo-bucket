"use client";

import { useModalStore } from "@/store/useModalStore";
import { BingoInputForm } from "./BingoInputForm";
import BingoGridItem from "./BingoGridItem";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import { BingoItem } from "@/types/bingo";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

type Props = {
    boardId: string
}

export default function BingoGrid({ boardId }: Props) {
    const modal = useModalStore();
    const { board, addItem, editItem, deleteItem, toggleCompleted } = useBingoBoard(boardId);
    const prevBingoCount = useRef(board.bingoLines?.length || 0);

    useEffect(() => {
        if (board.bingoLines && board.bingoLines.length > prevBingoCount.current) {
            toast.success(`🎉 빙고 ${board.bingoLines.length}줄 완성!`);
            prevBingoCount.current = board.bingoLines.length;
        }
    }, [board.bingoLines]);

    const openBingoInputModal = (item: BingoItem, isEdit: boolean) => {
        modal.open({
            title: "✨ 어떤 걸 이뤄볼까요?",
            description: "언젠가 꼭 하고 싶은 일이라면 충분해요.",
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
        if (isEdit) {
            editItem(id, value);
        } else {
            addItem(id, value);
        }
        modal.close();
    };

    const handleAddItem = (item: BingoItem) => { openBingoInputModal(item, false); };
    const handleEditItem = (item: BingoItem) => { openBingoInputModal(item, true); };

    const handleToggleComplete = (id: string) => { toggleCompleted(id); };
    const handleDeleteItem = (id: string) => { deleteItem(id); };

    return (
        <div className="grid gap-4 grid-cols-3">
            {board.items.map((item) => (
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