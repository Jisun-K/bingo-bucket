"use client";

import { useModalStore } from "@/store/useModalStore";
import { BingoInputForm } from "./BingoInputForm";
import BingoBoardItem from "./BingoBoardItem";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import { BingoItem } from "@/types/bingo";
import { useBingoListener } from "@/hooks/useBingoListener";
import { useBingogoControl } from "@/hooks/useBingoControl";
import { Button } from "../ui/button";

type Props = {
    boardId: string
}

export default function BingoBoard({ boardId }: Props) {
    const modal = useModalStore();
    const { createNewBoard } = useBingogoControl();
    const { board, addItem, editItem, deleteItem, toggleCompleted } = useBingoBoard(boardId);
    useBingoListener({
        boardId,
        onAllClear: () => {
            modal.open({
                title: "🏆 모두 클리어했어요!",
                description: "훌륭해요! 이제 새로운 목표를 설정해볼까요?",
                children: <div>
                    <div className="flex gap-2 justify-end mt-4">
                        <Button type="button" className="bg-white text-black hover:bg-gray-200" onClick={() => modal.close()}> 닫기 </Button>
                        <Button onClick={handleRestart}> 새로 하기 </Button>
                    </div>
                </div>
            });
        }
    });

    const handleRestart = () => {
        createNewBoard(3);
        modal.close();
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
        <div className="grid gap-4 grid-cols-3">
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