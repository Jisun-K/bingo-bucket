import { create } from "zustand";
import { nanoid } from "nanoid";

export interface BingoBoard {
    id: string;
    size: number;
    items: BingoItem[];
    createdAt: string;
    updatedAt: string;
    title?: string;
    period?: string;
}

export interface BingoItem {
    id: string;
    order: number; // 그리드 칸 순서
    parentId: string;
    content: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    disabled?: boolean;
}

interface BingoState {
    boards: BingoBoard[],
    createBingoBoard: (size?: number) => string;
    getBingoBoard: (id: string) => BingoBoard;
    updateItem: (boardId: string, itemId: string, content: string, isEidt?: boolean) => void;
    resetItem: (boardId: string, itemId: string) => void;
    toggleComplete: (boardId: string, itemId: string) => void;
    disableBingoLine: (boardId: string, indexes: number[]) => void;
}

export const useBingoStore = create<BingoState>((set, get) => {
    const createBingoItem = (boardId: string, order: number): BingoItem => ({
        id: nanoid(),
        order,
        parentId: boardId,
        content: '',
        isCompleted: false,
        createdAt: '',
        updatedAt: '',
        disabled: false
    });

    const updateBingoItem = (boards: BingoBoard[], boardId: string, itemId: string, updater: (item: BingoItem) => BingoItem): BingoBoard[] => {
        return boards.map(board => 
            board.id === boardId 
                ? { 
                    ...board, 
                    items: board.items.map(item => 
                        item.id === itemId ? updater(item) : item
                    ),
                    updatedAt: new Date().toISOString()
                } 
                : board
        );
    }

    return {
        boards: [],
        createBingoBoard: (size = 3) => {
            const boardId = nanoid();
            const items = Array.from({ length: size * size }, (_, i) => createBingoItem(boardId, i));
            set(state => ({
                boards: [...state.boards, {
                    id: boardId,
                    size,
                    items,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }]
            }));
            return boardId;
        },
        getBingoBoard: (id: string): BingoBoard => {
            const board = get().boards.find(b => b.id === id);
            if (!board) throw new Error(`Board not found: ${id}`);
            return board;
        },
        updateItem: (boardId, itemId, content, isEdit = false) => {
            set(state => ({
                boards: updateBingoItem(state.boards, boardId, itemId, item => ({
                    ...item,
                    content,
                    createdAt: isEdit ? item.createdAt : new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }))
            }));
        },
        resetItem: (boardId, itemId) => {
            set(state => ({
                boards: updateBingoItem(state.boards, boardId, itemId, item => ({
                    ...item,
                    content: '',
                    isCompleted: false,
                    createdAt: '',
                    updatedAt: '',
                    disabled: false,
                }))
            }));
        },
        toggleComplete: (boardId, itemId) => {
            set(state => ({
                boards: updateBingoItem(state.boards, boardId, itemId, item => ({
                    ...item,
                    isCompleted: !item.isCompleted,
                    updatedAt: new Date().toISOString(),
                    disabled: !item.disabled,
                }))
            }));
        },
        disableBingoLine: (boardId, indexes) => {   
            set(state => ({}))
        },
    }
}); 
