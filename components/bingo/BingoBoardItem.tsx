import { ThemeType } from "@/config/themeConfig";
import { BingoItem } from "@/types/bingo";
import clsx from "clsx";
import ThemedIcon from "../common/ThemedIcon";

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
        { action: "edit", icon: "/icons/ic_modify.svg", alt: "수정", onClick: onEdit },
        { action: "delete", icon: "/icons/ic_delete.svg", alt: "삭제", onClick: onDelete },
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
                    {item.content || "+"}
                </p>
                {item.content && !item.isCompleted && (
                    <div className="absolute right-2 bottom-2 flex gap-1">
                        {buttons.map((button) => (
                            <button
                                key={button.action}
                                className="p-1 rounded-full hover:shadow-md transition-shadow duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    button.onClick?.();
                                }}
                            >
                                <ThemedIcon icon={button.icon} alt={button.alt} theme={theme} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}