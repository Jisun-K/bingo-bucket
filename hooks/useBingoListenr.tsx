"use client";

import { useEffect, useRef } from "react";
import { useBingoStore } from "@/store/useBingoStore";
import { toast } from "sonner";
import { useCelebrationStore } from "@/store/useCelebration";

export function useBingoListner(boardId: string) {
    const board = useBingoStore((state) => state.getBingoBoard(boardId));
    const prevBingoCount = useRef(board.bingoLines?.length || 0);
    const { open } = useCelebrationStore();

    useEffect(() => {
        if (!board.bingoLines) return;
        const current = board.bingoLines.length;
        const totalPossibleLines = board.size * 2 + 2;

        if (current > prevBingoCount.current) {
            toast.success(`🎉 빙고 ${board.bingoLines.length}줄 완성!`);
            prevBingoCount.current = board.bingoLines.length;

            if(current === totalPossibleLines) { open(); }
        }
    }, [board.bingoLines]);
    return {};
}