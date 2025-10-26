type Props = {
    id: string;
    order: number;
    content: string;
    onClick: (id: number) => void;
}

export default function BingoGridItem({ id, order, content, onClick }: Props) {
    return (
        <div className="aspect-square rounded-lg border-2 transition-all duration-300 cursor-pointer overflow-y-auto py-4">
            <div className="p-3 flex flex-col items-center justify-center text-center h-full"
                onClick={() => onClick(order)}>
                <p className="text-muted-foreground text-sm">
                    {content || "+"}
                </p>
            </div>
        </div>
    );
}
