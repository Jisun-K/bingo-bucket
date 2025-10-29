"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Props = {
    initValue?: string;
    isEdit?: boolean;
    onSubmit: (value: string) => void;
    onCancel: () => void;
};


export function BingoInputForm({ initValue = "", isEdit = false, onSubmit, onCancel }: Props) {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        setValue(initValue);
    }, [initValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        onSubmit(value);
        setValue("");
    };

    const handleCancel = () => {
        onCancel();
        setValue(initValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="ex. 책 5권 읽기, 다이어트 성공하기 등등.."
                className="w-full border p-2 rounded mb-4"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="flex justify-end gap-2">
                <Button type="button" onClick={handleCancel} className="bg-white text-black hover:bg-gray-200">취소</Button>
                <Button type="submit" onClick={handleSubmit}>{!isEdit ? "추가" : "수정"} </Button>
            </div>
        </form>
    );
}
