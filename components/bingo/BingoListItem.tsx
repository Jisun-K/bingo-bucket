"use client";

import clsx from "clsx";
import { memo, useState, useRef, useEffect } from "react";
import { FileEdit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { BingoBoard } from "@/types/bingo";

interface BingoListItemProps {
    board: BingoBoard;
    isActive: boolean;
    onSelect: () => void;
    onUpdateTitle: (title: string) => void;
    onDelete: () => void;
}

function BingoListItem({
    board,
    isActive,
    onSelect,
    onUpdateTitle,
    onDelete,
}: BingoListItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(board.title || "");
    
    const inputRef = useRef<HTMLInputElement>(null);

    const completedCount = board.bingoLines?.length || 0;
    const itemTheme = board.theme || "default";
    const totalCount = board.size * 2 + 2;
    const progress = Math.min((completedCount / totalCount) * 100, 100);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleUpdate = () => {
        if (!title.trim()) {
            setTitle(board.title || "");
        } else {
            onUpdateTitle(title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            handleUpdate();
        }
        if (e.key === "Escape") {
            setTitle(board.title || "");
            setIsEditing(false);
        }
    };

    return (
        <div
            data-theme={itemTheme}
            className={clsx(
                "group relative flex flex-col gap-3 p-4 mb-4 rounded-xl transition-all hover:shadow-md border-2",
                isActive
                    ? "border-(--bg-color-bingo) bg-(--bg-color-bingo)/20"
                    : "border-(--border-color-bingo) bg-[#FAFAFA]"
            )}
        >
            <div className="flex justify-between items-center">
                <div className="w-4 h-4 rounded-full shadow-sm bg-(--bg-color-bingo)" />

                <div className="flex gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isEditing) { setTitle(board.title || ""); }
                            setIsEditing(!isEditing);
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                        className="p-1.5 text-gray-400 hover:bg-gray-50 active:bg-gray-50 rounded-md transition-colors"
                    >
                        <FileEdit size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-50 active:text-red-500 active:bg-gray-50 rounded-md transition-colors"
                        title="삭제"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div 
                onClick={!isEditing ? onSelect : undefined} 
                className="cursor-pointer"
            >
                <div className="relative h-7 w-full">
                    <input
                        ref={inputRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleUpdate}
                        disabled={!isEditing} 
                        placeholder={board.title}
                        className={clsx(
                            "w-full h-full bg-transparent border-none outline-none p-0 m-0",
                            "text-[16px] md:text-sm font-semibold text-gray-900 font-inherit leading-[28px]",
                            "appearance-none focus:ring-0 placeholder:text-gray-400",
                            "disabled:opacity-100 disabled:cursor-pointer disabled:bg-transparent disabled:text-gray-900"
                        )}
                    />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                    {board.updatedAt ? format(new Date(board.updatedAt), "yyyy. MM. dd.", { locale: ko }) : "-"}
                </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
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
                <span className="absolute top-4 right-1/2 translate-x-1/2 -translate-y-8 bg-black text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-active:opacity-100">
                    현재 선택됨
                </span>
            )}
        </div>
    );
}

export default memo(BingoListItem);