
type Props = {
    order: number;
    content: string;
    onClick: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function BingoGridItem({ order, content, onClick, onEdit, onDelete }: Props) {

    const buttons = [
        { action: 'edit', icon: '/icons/ic_modify.svg', alt: '수정', onClick: onEdit },
        { action: 'delete', icon: '/icons/ic_delete.svg', alt: '삭제', onClick: onDelete },
    ]

    return (
        <div className="relative aspect-square rounded-lg border-2 transition-all duration-300 cursor-pointer overflow-y-auto py-4">
            <div className="p-3 flex flex-col items-center justify-center text-center h-full"
                onClick={onClick}>
                <p className="text-muted-foreground text-sm">
                    {content || "+"}
                </p>
            </div>
            {content &&
                <div className="absolute right-2 bottom-1">
                    {buttons.map((button) =>
                        <button key={button.action}
                            className="mt-4 ml-1 p-1 rounded-full bg-white shadow-md hover:shadow-lg border-1 transition-shadow duration-200"
                            onClick={(e) => {button.onClick?.();}}>
                            <img src={button.icon} alt={button.alt} className="w-5 h-5" />
                        </button>
                    )}
                </div>
            }
        </div>
    );
}
