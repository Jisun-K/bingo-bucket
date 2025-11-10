"use client";

import { useEffect, useState } from "react";
import { useBingoStore } from "@/store/useBingoStore";
import BingoBoard from "@/components/bingo/BingoBoard";
import ThemeSelect from "@/components/common/ThemeSelect";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { ensureBingoBoard } = useBingoStore();   

    useEffect(() => {
        const id = ensureBingoBoard(3);
        router.push(`/bingo/${id}`);
    }, []);

    return (
        <></>
    );
}
