"use client";

import { useViewportHeight } from "@/hooks/useViewportHeight";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useViewportHeight();

    return (
        <div className="h-svh h-dvh h-[calc(var(--vh,1vh)*100)] overflow-hidden">
            {/* <main className="flex-1 overflow-auto
                        pt-[env(safe-area-inset-top)] 
                        pb-[env(safe-area-inset-bottom)]
                        flex flex-col justify-center items-center"> */}
                {children}
            {/* </main> */}
        </div>
    );
}