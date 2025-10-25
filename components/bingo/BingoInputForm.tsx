"use client";

import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
    onSubmit: (value: string) => void;
    onCancel: () => void;
};


export function BingoInputForm({ onSubmit, onCancel }: Props) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(value);
        setValue("");
    };

    const handleCancel = () => {
        onCancel();
        setValue("");
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
                <Button type="button" onClick={handleCancel} className="bg-white text-black">취소</Button>
                <Button type="submit" onClick={handleSubmit}>추가</Button>
            </div>
        </form>
    );
}
