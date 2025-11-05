import { BingoItem } from "@/types/bingo";
import { getBingoLines } from "./getBingoLines";

interface BingoResult {
    completedLines: number[][];
    totalLines: number;
}

export const checkBingo = (items: BingoItem[], size: number): BingoResult => {
    const lines = getBingoLines(size);
    const completedLines: number[][] = [];

    for(const line of lines) {
        const isCompleted = line.every(index => items[index]?.isCompleted);
        if(isCompleted) { completedLines.push(line); }
    }

    return { completedLines, totalLines: completedLines.length};
}