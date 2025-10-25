import { ReactNode } from "react";
import { create } from "zustand";

export type DialogType = "alert" | "confirm" | "form";

interface DialogState {
    isOpen: boolean;
    type?: DialogType;
    title?: string;
    description?: string;
    children?: ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    open: (props: Partial<Omit<DialogState, "open" | "close">>) => void;
    close: () => void;
}

export const useDialog = create<DialogState>((set) => ({
    isOpen: false,
    open: (props) => set({ isOpen: true, ...props }),
    close: () => {
        set({ isOpen: false });
        setTimeout(() => {
            set({
                title: undefined,
                description: undefined,
                children: undefined,
                onConfirm: undefined,
                onCancel: undefined,
            });
        }, 300);
    }
}));