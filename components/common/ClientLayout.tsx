
"use client";

import { useEffect } from "react";

export default function ClientLayout({ children }: Readonly<{children: React.ReactNode;}>) {
    useEffect(() => {
        const setVh = () => {
            document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
        };
        setVh();
        window.addEventListener("resize", setVh);
        return () => window.removeEventListener("resize", setVh);
    }, [])
    return (
        <div className="h-dvh h-[calc(var(--vh, 1vh) * 100)]">{children}</div>
    );
}
