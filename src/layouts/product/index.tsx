"use client";
import { JSX } from "react";

export type LayoutsProps = {
    children: JSX.Element | React.ReactNode;
};

export default function ProductLayout({ children }: LayoutsProps) {
    return (
        <>
            <div className="min-h-screen font-sans lg:bg-white bg-gray-light">
                <main className="container mx-auto space-y-8 lg:pt-8 pb-5 lg:px-5 px-0 ">
                    {children}
                </main>
            </div>
        </>
    );
}
