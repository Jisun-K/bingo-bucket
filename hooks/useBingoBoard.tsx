"use client";

import { useBingoStore } from "@/store/useBingoStore";
import { BingoBoard } from "@/types/bingo";

export function useBingoBoard(boardId: string) {
    const { getBingoBoard, updateBingoBoard, updateItem, resetItem, toggleComplete } = useBingoStore();

    const board = getBingoBoard(boardId);

    const updateBoard = (updater: (board: BingoBoard) => Partial<BingoBoard>) => {
        updateBingoBoard(boardId, updater);
    }
    const addItem = (itemId: string, content: string) => { updateItem(boardId, itemId, content, false); }
    const editItem = (itemId: string, content: string) => { updateItem(boardId, itemId, content, true); }
    const deleteItem = (itemId: string) => { resetItem(boardId, itemId); }
    const toggleCompleted = (itemId: string) => { toggleComplete(boardId, itemId); }

    return { board, updateBoard, addItem, editItem, deleteItem, toggleCompleted };
}