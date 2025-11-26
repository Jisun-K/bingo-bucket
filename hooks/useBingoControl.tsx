import { useBingoStore } from "@/store/useBingoStore";
import { BingoBoard } from "@/types/bingo";
import { useRouter } from "next/navigation";

export function useBingogoControl() {
    const router = useRouter();
    const { createBingoBoard } = useBingoStore();

    const createNewBoard = (size: number = 3) => {
        const newId = createBingoBoard(size);
        router.push(`/bingo/${newId}`);
    }

    return { createNewBoard };
}