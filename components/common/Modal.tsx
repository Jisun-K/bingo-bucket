"use client";

import { useModalStore } from "@/store/useModalStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export default function Modal() {
    const { isOpen, type, title, description, children, close, confirmText, cancelText, onConfirm } = useModalStore();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
            <DialogContent>
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription> {description} </DialogDescription>}
                </DialogHeader>
                <div>
                    {children}
                </div>
                {type === "confirm" &&
                    <DialogFooter>
                        <div className="flex gap-2 justify-end mt-4">
                            <Button type="button" className="bg-white text-black hover:bg-gray-200" onClick={() => close()}> {cancelText} </Button>
                            <Button onClick={() => {onConfirm?.(); close();}}> {confirmText} </Button>
                        </div>
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    );
}