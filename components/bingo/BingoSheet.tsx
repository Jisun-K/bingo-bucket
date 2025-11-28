"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ThemeType } from "@/config/themeConfig";
import { useBingoStore } from "@/store/useBingoStore";
import BingoListItem from "./BingoListItem";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { LayoutGrid } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { useBoardControl } from "@/hooks/useBoardControl";

export function BingoSheet({ theme }: { theme: ThemeType }) {
    const router = useRouter();
    const params = useParams();
    const { boards } = useBingoStore();
    const { deleteBoard } = useBoardControl();
    const updateBoard = useBingoStore((state) => state.updateBingoBoard);
    const modal = useModalStore();

    const currActiveId = params.id;

    const handleUpdateTitle = (id: string, title: string) => {
        updateBoard(id, (prev) => ({ title: title || prev.title }));
    }

    const handleMove = (id: string) => {
        router.push(`/bingo/${id}`);
    }
    const handleDeleteItem = (id: string) => {
        modal.open({
            type: "confirm",
            title: "정말 삭제하시겠어요? 🗑️",
            description: "삭제된 빙고판은 복구할 수 없습니다.",
            confirmText: "삭제",
            onConfirm: () => { deleteBoard(id); }
        });
    };

    return (
        <Sheet>
            <SheetTrigger>
                <LayoutGrid size={20} />
            </SheetTrigger>
            <SheetContent className="p-4">
                {/* 경고 뜨는 거 방지용 */}
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                {boards && boards.length > 0 &&
                    <div className="">
                        {boards.map((board) => (
                            <BingoListItem key={board.id}
                                board={board}
                                isActive={currActiveId === board.id}
                                onSelect={() => handleMove(board.id)}
                                onUpdateTitle={(title) => handleUpdateTitle(board.id, title)}
                                onDelete={() => handleDeleteItem(board.id)}
                            />
                        ))}
                    </div>
                }
                {boards.length === 0 && (
                    <p className="text-center text-sm text-gray-500 mt-10">
                        생성된 빙고판이 없습니다. <br />
                        새 빙고판을 만들어보세요!
                    </p>
                )}
            </SheetContent>
        </Sheet >
    );
} 