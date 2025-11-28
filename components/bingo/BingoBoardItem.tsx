import clsx from "clsx";
import { Eraser, Plus, Trash2 } from "lucide-react";
import { ThemeType } from "@/config/themeConfig";
import { BingoItem } from "@/types/bingo";

type Props = {
    theme: ThemeType;
    item: BingoItem;
    onAdd: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onToggleComplete?: () => void;
};

export default function BingoBoardItem({
    theme,
    item,
    onAdd,
    onEdit,
    onDelete,
    onToggleComplete,
}: Props) {
    const buttons = [
        { action: "edit", icon: Eraser, onClick: onEdit, style: "" },
        { action: "delete", icon: Trash2, onClick: onDelete, style: "hover:text-red-500" },
    ];

    const handleClick = () => {
        if (item.disabled) return;
        if (!item.content || item.content.length === 0) {
            onAdd();
        } else {
            onToggleComplete?.();
        }
    };

    return (
        <div
            className={clsx(
                "relative w-full pt-[100%] rounded-3xl border-2 transition-all duration-300 cursor-pointer",
                {
                    "border-(--border-color-empty) bg-(--bg-color-empty) text-(--text-color-empty) hover:shadow-lg  font-medium":
                        !item.isCompleted && !item.disabled,
                    "bg-(--bg-color-completed) font-semibold":
                        item.isCompleted && !item.disabled,
                    "border-(--border-color-bingo) bg-(--bg-color-bingo) text-(--text-color-bingo) scale-110":
                        item.isCompleted && item.disabled,
                }
            )}
        >            <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-3"
            onClick={handleClick}
        >
                <p className="text-sm break-all">
                    {item.content || <Plus size={14}/>}
                </p>
                {item.content && !item.isCompleted && (
                    <div className="absolute right-2 bottom-2 flex gap-1">
                        {buttons.map((button) => (
                            <button
                                key={button.action}
                                className={clsx(
                                    "p-1 rounded-md hover:bg-(--bg-color-completed) hover:shadow-md transition-shadow duration-200",
                                    button.style,
                                )}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    button.onClick?.();
                                }}
                            >
                                <button.icon size={16} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
}