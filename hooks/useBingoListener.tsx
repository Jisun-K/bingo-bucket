"use client";

import { useEffect, useRef } from "react";
import { useBingoStore } from "@/store/useBingoStore";
import { toast } from "sonner";
import { useCelebrationStore } from "@/store/useCelebrationStore";

interface UseBingoListenerProps {
    boardId: string;
    onAllClear?: () => void;
}

export function useBingoListener({ boardId, onAllClear }: UseBingoListenerProps) {
    const board = useBingoStore((state) => state.getBingoBoard(boardId));
    const prevBingoCount = useRef(board?.bingoLines?.length || 0);
    const { open: openConfetti } = useCelebrationStore();

    useEffect(() => {
        if (!board?.bingoLines) return;
        
        const current = board.bingoLines.length;
        const totalPossibleLines = board.size * 2 + 2;

        if (current > prevBingoCount.current) {
            toast.success(`🎉 빙고 ${board.bingoLines.length}줄 완성!`);
            
            if (current === totalPossibleLines) {
                openConfetti(); 
                if (onAllClear) onAllClear();
            }
            
            prevBingoCount.current = current;
        }
    }, [board?.bingoLines, board?.size, onAllClear, openConfetti]);

    return {};
}