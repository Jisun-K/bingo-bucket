import { Skeleton } from "@/components/ui/skeleton";

export function BingoSkeleton() {
    return (
        <div className="grid gap-4 grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="relative w-full pt-[100%]">
                    <Skeleton className="absolute inset-0 w-full h-full rounded-3xl" />
                </div>
            ))}
        </div>
    );
}