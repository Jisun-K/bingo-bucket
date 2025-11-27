import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";
import { BingoBoard, BingoItem } from "@/types/bingo";
import { checkBingo } from "@/lib/bingo/checkBingo";

interface BingoState {
    boards: BingoBoard[],
    lastActiveBoardId: string;
    setLastActiveBingoBoardId: (id: string) => void;
    createBingoBoard: (size?: number) => string;
    ensureBingoBoard: (size?: number) => string; 
    getBingoBoard: (id: string) => BingoBoard | undefined;
    updateBingoBoard: (boardId: string, updater: (board: BingoBoard) => Partial<BingoBoard>) => void;
    updateItem: (boardId: string, itemId: string, content: string, isEidt?: boolean) => void;
    resetItem: (boardId: string, itemId: string) => void;
    toggleComplete: (boardId: string, itemId: string) => void;
    checkBingoLine: (boardId: string) => void;
}

export const useBingoStore = create<BingoState>()(
    persist(
        (set, get) => {
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
                lastActiveBoardId: '',
                setLastActiveBingoBoardId: (id: string) => {
                    set({ lastActiveBoardId: id });
                },
                createBingoBoard: (size = 3) => {
                    const boardId = nanoid();
                    const items = Array.from({ length: size * size }, (_, i) => createBingoItem(boardId, i));
                    set(state => ({
                        boards: [...state.boards, {
                            id: boardId,
                            size,
                            title: "제목 없음",
                            theme: 'default',
                            items,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        }]
                    }));
                    return boardId;
                },
                // 보드가 있는지 확인하는 함수
                // 보드를 여러개 생성할 수 있는 기능이 추가되었으니, 
                // 이 기능도 수정해야함.
                ensureBingoBoard: (size = 3) => {
                    const { boards, createBingoBoard, lastActiveBoardId} = get();
                    if(lastActiveBoardId) {
                        const lastBingoBoard = boards.find(b => b.id === lastActiveBoardId);
                        if(lastBingoBoard) { return lastBingoBoard.id; };
                    }
                    
                    if (boards.length > 0) { return boards[0].id }
                    return createBingoBoard(size);
                },
                getBingoBoard: (id: string): BingoBoard | undefined => {
                    const board = get().boards.find(b => b.id === id);
                    // if (!board) throw new Error(`Board not found: ${id}`);
                    return board;
                },
                updateBingoBoard: (boardId, updater) => {
                    set(state => ({
                        boards: state.boards.map(board =>
                            board.id === boardId
                                ? { ...board, ...updater(board), updatedAt: new Date().toISOString() }
                                : board
                        )
                    }));
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

                    get().checkBingoLine(boardId);
                },
                checkBingoLine: (boardId) => {
                    const board = get().getBingoBoard(boardId);
                    if(!board) return;
                    const bingoLines = checkBingo(board.items, board.size);
                    if (!bingoLines.completedLines) return;

                    const disabledIds = bingoLines.completedLines.flatMap(line =>
                        line.map(idx => board.items[idx].id)
                    );

                    set(state => ({
                        boards: state.boards.map(board =>
                            board.id === boardId ? {
                                ...board,
                                items: board.items.map(item => ({
                                    ...item,
                                    disabled: disabledIds.includes(item.id),
                                    updatedAt: new Date().toISOString()
                                })),
                                updatedAt: new Date().toISOString(),
                                bingoLines: bingoLines.completedLines
                            } : board
                        )
                    }));
                },
            };
        },
        {
            name: 'bingle-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);