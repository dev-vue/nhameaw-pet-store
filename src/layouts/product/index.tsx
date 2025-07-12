"use client";
import { JSX } from "react";

export type LayoutsProps = {
    children: JSX.Element | React.ReactNode;
};

export default function ProductLayout({ children }: LayoutsProps) {
    return (
        <>
            <div className="bg-white min-h-screen font-sans">
                <main className="container mx-auto space-y-8 pt-8 pb-5 md:px-5 px-3">
                    {children}
                </main>
            </div>
        </>
    );
}
