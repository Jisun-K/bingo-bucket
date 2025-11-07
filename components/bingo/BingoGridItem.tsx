import { useThemeStore } from "@/store/useThemeStore";
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
    const { theme } = useThemeStore();

    const buttons = [
        { action: 'edit', icon: '/icons/ic_modify.svg', alt: '수정', onClick: onEdit },
        { action: 'delete', icon: '/icons/ic_delete.svg', alt: '삭제', onClick: onDelete },
    ];

    const darkTheme = ["midnight", "forest", "nebula"];

    const handleClick = () => {
        if (item.disabled) return;
        if (!item.content || item.content.length === 0) {
            onAdd();
        } else {
            onToggleComplete?.();
        }
    };

    return (
        <div className="relative w-full">
            <div className="pt-[100%]"></div>
            <div
                className={clsx(
                    "absolute inset-0 rounded-3xl border-2 transition-all duration-300 cursor-pointer font-semibold flex flex-col items-center justify-center text-center p-3 overflow-hidden",
                    {
                        "border-(--border-color-empty) bg-(--bg-color-empty) text-(--text-color-empty) hover:shadow-lg": !item.isCompleted && !item.disabled,
                        "bg-(--bg-color-completed)": item.isCompleted && !item.disabled,
                        "border-(--border-color-bingo) bg-(--bg-color-bingo) text-(--text-color-bingo) scale-110": item.isCompleted && item.disabled,
                    }
                )}
                onClick={handleClick}
            >
                <p className="text-sm">{item.content || "+"}</p>

                {item.content && !item.isCompleted && (
                    <div className="absolute right-2 bottom-1">
                        {buttons.map((button) => (
                            <button
                                key={button.action}
                                className="mt-4 ml-1 p-1 rounded-full hover:shadow-lg transition-shadow duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    button.onClick?.();
                                }}
                            >
                                <img
                                    src={button.icon}
                                    alt={button.alt}
                                    className={clsx(
                                        "w-5 h-5 transition-all duration-100",
                                        darkTheme.includes(theme) && "invert"
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}