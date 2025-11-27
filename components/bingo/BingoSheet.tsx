import { ThemeType } from "@/config/themeConfig";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import ThemedIcon from "../common/ThemedIcon";

export function BingoSheet({ theme }: { theme: ThemeType }) {
    return (
        <Sheet>
            <SheetTrigger>
                <ThemedIcon icon="/icons/ic_bingo_list_20.svg" alt="빙고 리스트 버튼" theme={theme} style="w-9 h-9"/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>빙고판을 </SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
} 