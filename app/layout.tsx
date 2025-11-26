import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

import Modal from "@/components/common/Modal";

import { Toaster } from "sonner";
import { Confetti } from "@/components/common/Confetti";
import ClientLayout from "@/components/common/ClientLayout";

const freesentation = localFont({
    src: [
        {
            path: './fonts/Freesentation-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/Freesentation-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Freesentation-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/Freesentation-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-freesentation',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Bingle",
    description: "'하고 싶은 일'을 하나씩, 빙고로 완성해 봐요!"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${freesentation.variable} antialiased`}>
                <ClientLayout>
                    {/* <ThemeProvider> */}
                        {children}
                        <Modal />
                        <Toaster position="top-center" />
                        <Confetti />
                    {/* </ThemeProvider> */}
                </ClientLayout>
            </body>
        </html>
    );
}
