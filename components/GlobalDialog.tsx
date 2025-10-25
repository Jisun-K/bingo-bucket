"use client";

import { useDialog } from "@/hooks/useDialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

export default function GlobalDialog() {
    const { isOpen, type, title, description, children, confirmText, onConfirm, onCancel, close } = useDialog();

    const handleCancel = () => {
        onCancel?.();
        close();
    }

    const handleConfirm = () => {
        onConfirm?.();
        close();
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
            <DialogContent>
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription> {description} </DialogDescription>}
                </DialogHeader>
                {children}
                <div className="flex justify-end gap-2">
                    {(type === "confirm" || type === "form") &&
                        <Button onClick={handleCancel} className="bg-white text-black">취소</Button>
                    }
                    <Button onClick={handleConfirm}>
                        {confirmText ? confirmText : "확인"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}