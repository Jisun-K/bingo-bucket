
import { BingoItem } from "./BingoGrid";

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
        if (!item.content || item.content.length === 0) {
            onAdd();
        } else {
            onToggleComplete?.();
        }
    }

    return (
        <div className={`relative aspect-square rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-y-auto py-4
            ${item.isCompleted ? 'border-green-500 bg-green-200 scale-110' : 'border-gray-300 hover:shadow-lg hover:border-gray-400'}`}>
            <div className="p-3 flex flex-col items-center justify-center text-center h-full"
                onClick={handleClick}>
                <p className="text-muted-foreground text-sm">
                    {item.content || "+"}
                </p>
                {item.content &&
                    <div className="absolute right-2 bottom-1">
                        {buttons.map((button) =>
                            <button key={button.action}
                                className="mt-4 ml-1 p-1 rounded-full bg-white shadow-md hover:shadow-lg border-1 transition-shadow duration-200"
                                onClick={(e) => { button.onClick?.(); }}>
                                <img src={button.icon} alt={button.alt} className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
