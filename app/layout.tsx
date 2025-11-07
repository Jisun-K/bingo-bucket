import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Modal from "@/components/common/Modal";
import ThemeProvider from "@/components/common/ThemeProvider";
import { Toaster } from "sonner";

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
    title: "Bingle :)",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${freesentation.variable} antialiased`}>
                <ThemeProvider>
                    {children}
                    <Modal />
                    <Toaster position="top-center"/>
                </ThemeProvider>
            </body>
        </html>
    );
}
