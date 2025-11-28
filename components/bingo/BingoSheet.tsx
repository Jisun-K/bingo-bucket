"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeType } from "@/config/themeConfig";
import { useBingoStore } from "@/store/useBingoStore";
import BingoListItem from "./BingoListItem";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { LayoutGrid } from "lucide-react";
import { useBingoBoard } from "@/hooks/useBingoBoard";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "../ui/button";
import { useBoardControl } from "@/hooks/useBoardControl";

export function BingoSheet({ theme }: { theme: ThemeType }) {
    const router = useRouter();
    const { boards } = useBingoStore();
    const { deleteBoard } = useBoardControl();
    const modal = useModalStore();

    const handleMove = (id: string) => {
        router.push(`/bingo/${id}`);
    }
    const handleDeleteItem = (id: string) => {
        modal.open({
            type: "confirm",
            title: "정말 삭제하시겠어요? 🗑️",
            description: "삭제된 빙고판은 복구할 수 없습니다.",
            confirmText: "삭제",
            onConfirm: () => {
                deleteBoard(id);
            }
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
                <div className="">
                    {boards.map((board) => (
                        <BingoListItem key={board.id}
                            board={board}
                            isActive={false}
                            onSelect={() => handleMove(board.id)}
                            onUpdateTitle={() => { }}
                            onDelete={() => handleDeleteItem(board.id)}
                        />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
} 