"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export default function Modal() {
    const { isOpen, title, description, children, close } = useModal();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
            <DialogContent>
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription> {description} </DialogDescription>}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}