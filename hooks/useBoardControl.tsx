import { useBingoStore } from "@/store/useBingoStore";
import { usePathname, useRouter } from "next/navigation";

export function useBoardControl() {
    const router = useRouter();
    const pathName = usePathname();
    const { createBingoBoard, deleteBingoBoard } = useBingoStore();

    const createNewBoard = (size: number = 3) => {
        const newId = createBingoBoard(size);
        router.push(`/bingo/${newId}`);
    }

    const deleteBoard = (boardId: string) => {
        deleteBingoBoard(boardId);

        // 현재 보고 있는 빙고판이냐
        if (pathName.includes(boardId)) {
            const nextActiveId = useBingoStore.getState().lastActiveBoardId;

            // router.replace(nextActiveId ? `/bingo/${nextActiveId}` : '/');
            if (nextActiveId) {
                router.replace(`/bingo/${nextActiveId}`);
            } else {
                router.replace('/');
            }
        }
    };

    return { createNewBoard, deleteBoard };
}