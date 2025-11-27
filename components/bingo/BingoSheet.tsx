"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeType } from "@/config/themeConfig";
import { useBingoStore } from "@/store/useBingoStore";
import BingoListItem from "./BingoListItem";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { LayoutGrid } from "lucide-react";

export function BingoSheet({ theme }:  {theme: ThemeType}) {
    const router = useRouter();
    const { boards } = useBingoStore();

    const handleMove = (id: string) => {
        router.push(`/bingo/${id}`);
    }

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
                    { boards.map((board) => (
                        <BingoListItem key={board.id} board={board} isActive={false} onSelect={(id) => handleMove(id)} onUpdateTitle={() => {}} onDelete={() => {}} />    
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
} 