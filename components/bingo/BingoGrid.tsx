"use client";

import { useModalStore } from "@/store/useModalStore";
import { BingoInputForm } from "./BingoInputForm";
import BingoGridItem from "./BingoGridItem";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import { BingoItem } from "@/types/bingo";

type Props = {
    boardId: string
}

export default function BingoGrid({boardId}: Props) {
    const modal = useModalStore();
    const { board, addItem, editItem, deleteItem, toggleCompleted } = useBingoBoard(boardId);
    
    const openBingoInputModal = (title: string, item: BingoItem, isEdit: boolean) => {
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
        if(isEdit) {
            editItem(id, value);
        } else {
            addItem(id, value);
        }
        modal.close();
    };

    const handleAddItem = (item: BingoItem) => { openBingoInputModal("목표 추가하기", item, false); };
    const handleEditItem = (item: BingoItem) => { openBingoInputModal("목표 수정하기", item, true); };
    
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