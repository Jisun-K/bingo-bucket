"use client";

import { useBingoStore } from "@/store/useBingoStore";

export function useBingoBoard(boardId: string) {
    const { getBingoBoard, updateItem, resetItem, toggleComplete } = useBingoStore();

    const board = getBingoBoard(boardId);

    const addItem = (itemId: string, content: string) => { updateItem(boardId, itemId, content, false); }
    const editItem = (itemId: string, content: string) => { updateItem(boardId, itemId, content, true); }
    const deleteItem = (itemId: string) => { resetItem(boardId, itemId); }
    const toggleCompleted = (itemId: string) => { toggleComplete(boardId, itemId); }

    return { board, addItem, editItem, deleteItem, toggleCompleted };
}