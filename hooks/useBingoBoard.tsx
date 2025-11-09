"use client";

import { useBingoStore } from "@/store/useBingoStore";

export function useBingoBoard(boardId: string) {
    const { getBingoBoard, setBingoBoardSize, updateItem, resetItem, toggleComplete } = useBingoStore();

    const board = boardId ? getBingoBoard(boardId) : undefined;

    const changeSize = (size: number) => {
        if (!boardId) return;
        setBingoBoardSize(boardId, size);
    }

    const addItem = (itemId: string, content: string) => {
        if (!boardId) return;
        updateItem(boardId, itemId, content, false);
    }
    const editItem = (itemId: string, content: string) => {
        if (!boardId) return;
        updateItem(boardId, itemId, content, true);
    }
    const deleteItem = (itemId: string) => {
        if (!boardId) return;
        resetItem(boardId, itemId);
    }
    const toggleCompleted = (itemId: string) => {
        if (!boardId) return;
        toggleComplete(boardId, itemId);
    }

    return { board, changeSize, addItem, editItem, deleteItem, toggleCompleted };
}