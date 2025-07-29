"use client";
import { JSX } from "react";

export type LayoutsProps = {
    children: JSX.Element | React.ReactNode;
};

export default function ProductLayout({ children }: LayoutsProps) {
    return (
        <>
            <div className="bg-white min-h-screen font-sans">
                <main className="container mx-auto space-y-8 lg:pt-8 pb-5 lg:px-5 px-0 lg:bg-white bg-gray-light">
                    {children}
                </main>
            </div>
        </>
    );
}
