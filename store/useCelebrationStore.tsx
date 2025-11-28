import { ReactNode } from "react";
import { create } from "zustand";

interface CelebrationState {
    isShow: boolean;
    count: number;
    open: () => void;
    close: () => void;
    children?: ReactNode;
}

export const useCelebrationStore = create<CelebrationState>((set) => ({
    isShow: false,
    count: 0,
    open: () => set((state) => ({ isShow: true, count: state.count + 1 })),
    close: () => set({ isShow: false })
}));