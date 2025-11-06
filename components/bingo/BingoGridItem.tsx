import { BingoItem } from "@/types/bingo";
import clsx from "clsx";

type Props = {
    item: BingoItem;
    onAdd: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onToggleComplete?: () => void;
}

export default function BingoGridItem({ item, onAdd, onEdit, onDelete, onToggleComplete }: Props) {
    const buttons = [
        { action: 'edit', icon: '/icons/ic_modify.svg', alt: '수정', onClick: onEdit },
        { action: 'delete', icon: '/icons/ic_delete.svg', alt: '삭제', onClick: onDelete },
    ];

    const handleClick = () => {
        if (item.disabled) { return; }
        if (!item.content || item.content.length === 0) {
            onAdd();
        } else {
            onToggleComplete?.();
        }
    }

    return (
        <div
            className={clsx(
                "relative aspect-square rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-y-auto py-4 font-semibold",
                {
                    "border-(--border-color-empty) bg-(--bg-color-empty) text-(--text-color-empty) hover:shadow-lg": !item.isCompleted && !item.disabled,
                    "bg-(--bg-color-completed)": item.isCompleted && !item.disabled,
                    "border-(--border-color-bingo) bg-(--bg-color-bingo) text-(--text-color-bingo) scale-110": item.isCompleted && item.disabled,
                }
            )}>
            <div className="p-3 flex flex-col items-center justify-center text-center h-full"
                onClick={handleClick}>
                <p className="text-sm">
                    {item.content || "+"}
                </p>    
                {item.content && !item.isCompleted &&
                    <div className="absolute right-2 bottom-1">
                        {buttons.map((button) =>
                            <button key={button.action}
                                className="mt-4 ml-1 p-1 rounded-full hover:shadow-lg transition-shadow duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    button.onClick?.();
                                }}>
                                <img src={button.icon} alt={button.alt} className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
