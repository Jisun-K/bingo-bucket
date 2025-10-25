import BingoGrid from "@/components/bingo/BingoGrid";

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8">
                <p className="text-muted-foreground mt-2">
                    빙고를 완성해보세요!
                </p>
            </header>
            <BingoGrid />
        </div>
    );
}
