import { ReactNode } from "react";
import { create } from "zustand";

interface ModalState {
    isOpen: boolean;
    title?: string;
    description?: string;
    children?: ReactNode;
    open: (props: Partial<Omit<ModalState, "open" | "close">>) => void;
    close: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    open: (props) => set({ isOpen: true, ...props }),
    close: () => {
        set({ isOpen: false });
        setTimeout(() => {
            set({
                title: undefined,
                description: undefined,
                children: undefined
            });
        }, 300);
    }
}));