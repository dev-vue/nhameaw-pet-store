"use client";
import { JSX } from "react";

export type LayoutsProps = {
    children: JSX.Element | React.ReactNode;
};

export default function MainLayout({ children }: LayoutsProps) {
    return (
        <>
            <div className="bg-gray-100 min-h-screen font-sans">
                <main className="container mx-auto space-y-8 py-5 md:px-5 px-3">
                    {children}
                </main>
            </div>
        </>
    );
}
