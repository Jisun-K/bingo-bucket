"use client";

import { useModalStore } from "@/store/useModalStore";
import { BingoInputForm } from "./BingoInputForm";
import BingoBoardItem from "./BingoBoardItem";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import { BingoItem } from "@/types/bingo";
import { useBingoListener } from "@/hooks/useBingoListener";
import { useBoardControl } from "@/hooks/useBoardControl";
import { Button } from "../ui/button";

type Props = {
    boardId: string
}

export default function BingoBoard({ boardId }: Props) {
    const modal = useModalStore();
    const { createNewBoard } = useBoardControl();
    const { board, addItem, editItem, deleteItem, toggleCompleted } = useBingoBoard(boardId);
    useBingoListener({
        boardId,
        onAllClear: () => {
            modal.open({
                type: "confirm",
                title: "🏆 모두 클리어했어요!",
                description: "훌륭해요! 이제 새로운 목표를 설정해볼까요?",
                confirmText: "새로 하기",
                onConfirm: () => { handleRestart(); }
            });
        }
    });

    const handleRestart = () => {
        createNewBoard(3);
        // modal.close();
    };

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
        <div className="grid gap-4 grid-cols-3 min-h-full">
            {board?.items.map((item) => (
                <BingoBoardItem
                    key={item.id}
                    theme={board.theme!}
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