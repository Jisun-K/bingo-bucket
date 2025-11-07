import { ReactNode } from "react";
import { create } from "zustand";

interface CelebrationState {
    isShow: boolean;
    open: () => void;
    close: () => void;
    children?: ReactNode;
}

export const useCelebrationStore = create<CelebrationState>((set) => ({
    isShow: false,
    open: () => set({ isShow: true }),
    close: () => set({ isShow: false })
}));