import { useBingoStore } from "@/store/useBingoStore";
import { BingoBoard } from "@/types/bingo";
import { usePathname, useRouter } from "next/navigation";

export function useBoardControl() {
    const router = useRouter();
    const pathName = usePathname();
    const { lastActiveBoardId, createBingoBoard, deleteBingoBoard } = useBingoStore();

    const createNewBoard = (size: number = 3) => {
        const newId = createBingoBoard(size);
        router.push(`/bingo/${newId}`);
    }

    const deleteBoard = (boardId: string) => {
        deleteBingoBoard(boardId);
        // actvie된 보드를 지운 경우
        if(pathName === `/bingo/${boardId}`) {
            // lastActiveBoardId 있다는 건 그 보드로 화면 이동, 없으면 home으로 가서 새로 생성.
            router.replace(lastActiveBoardId ? `/bingo/${lastActiveBoardId}` : "/");
        }
    };

    return { createNewBoard, deleteBoard };
}