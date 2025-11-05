export const getBingoLines = (size: number): number[][] => {
    if (size <= 0) return [];

    const lines: number[][] = [];
    for (let row = 0; row < size; row++) {
        lines.push(Array.from({ length: size }, (_, i) => row * size + i));
    }

    // columns
    for (let col = 0; col < size; col++) {
        lines.push(Array.from({ length: size }, (_, i) => col + i * size));
    }

    // main diagonal (top-left to bottom-right)
    lines.push(Array.from({ length: size }, (_, i) => i * (size + 1))); // ↘
    lines.push(Array.from({ length: size }, (_, i) => (i + 1) * (size - 1))); // ↙

    return lines;
}