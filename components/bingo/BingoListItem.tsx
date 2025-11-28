"use client";

import clsx from "clsx";
import { useState } from "react";
// import { format } from "date-fns";
import { Edit2, Eraser, FileEdit, Trash2 } from "lucide-react";
import { BingoBoard } from "@/types/bingo";
import { ThemeType } from "@/config/themeConfig";

interface BingoListItemProps {
    board: BingoBoard;
    isActive: boolean;
    onSelect: () => void;
    onUpdateTitle: (title: string) => void;
    onDelete: () => void;
}

export default function BingoListItem({
    board,
    isActive,
    onSelect,
    onUpdateTitle,
    onDelete,
}: BingoListItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(board.title || "");

    const completedCount = board.bingoLines?.length || 0;
    const itemTheme = board.theme || "default";
    const totalCount = board.size * 2 + 2;
    const progress = Math.min((completedCount / totalCount) * 100, 100);

    const handleUpdate = () => {
        onUpdateTitle(title);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleUpdate();
    };

    return (
        <div
            data-theme={itemTheme}
            className={clsx(
                "group relative flex flex-col gap-3 p-4 mb-4 rounded-xl bg-[#FAFAFA] border-(--border-color-bingo) border transition-all hover:shadow-md",
                { "bg-(--bg-color-bingo)/10 border-2 ring-1 ring-(--bg-color-bingo)": isActive }
            )}
        >
            <div className="flex justify-between items-center">
                <div className="w-4 h-4 rounded-full shadow-sm bg-(--bg-color-bingo)" />

                <div className="flex gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}
                        className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-md transition-colors">
                        <FileEdit size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-md transition-colors"
                        title="삭제">
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div onClick={isEditing ? undefined : onSelect} className="cursor-pointer">
                {isEditing ? (
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleUpdate}
                            placeholder={title}
                            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            autoFocus
                        />
                    </div>
                ) : (
                    <h3 className="font-semibold text-gray-900 truncate pr-2">
                        {board.title}
                    </h3>
                )}
{/* 
                <p className="text-xs text-gray-500 mt-1">
                    {board.updatedAt}
                </p> */}
            </div>

            <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500 bg-(--bg-color-bingo)"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
                <span className="text-xs font-medium text-gray-600 tabular-nums">
                    {Math.round(progress)}%
                </span>
            </div>

            {isActive && (
                <span className="absolute top-4 right-1/2 translate-x-1/2 -translate-y-8 bg-black text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    현재 선택됨
                </span>
            )}
        </div>
    );
}