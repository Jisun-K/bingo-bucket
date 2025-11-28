import { create } from "zustand";
import { ReactNode } from "react";

// 타입 정의는 그대로 유지
export type ModalType = "default" | "confirm" | "alert";

interface ModalConfig {
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    type?: ModalType;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

interface ModalState extends ModalConfig {
    isOpen: boolean;
    open: (config: ModalConfig) => void;
    close: () => void;
}

// ✨ 초기 상태값 (Reset용)
const initialState: ModalConfig = {
    title: undefined,
    description: undefined,
    children: undefined,
    type: "default",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: undefined,
};

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    ...initialState,

    open: (config) => set({
        isOpen: true,
        ...initialState, 
        ...config 
    }),

    close: () => {
        set({ isOpen: false });
        setTimeout(() => {
            set({ ...initialState });
        }, 300);
    }
}));