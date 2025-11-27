"use client";

import { useEffect } from "react";
import { useBingoStore } from "@/store/useBingoStore";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { ensureBingoBoard } = useBingoStore();   

    useEffect(() => {
        const id = ensureBingoBoard(3);
        // 페이지가 추가되면 이 부분도 수정 필요
        router.replace(`/bingo/${id}`);
    }, []);

    return (
        <></>
    );
}
