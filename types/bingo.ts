import { ThemeType } from "@/config/themeConfig";

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

export interface BingoBoard {
    id: string;
    size: number;
    title: string;
    items: BingoItem[];
    createdAt: string;
    updatedAt: string;
    theme?: ThemeType;
    bingoLines?: number[][],
    period?: string;
}
