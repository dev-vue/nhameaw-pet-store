"use client";
import { JSX } from "react";

export type LayoutsProps = {
    children: JSX.Element | React.ReactNode;
};

export default function MyCartLayout({ children }: LayoutsProps) {
    return (
        <>
            <div className="bg-gray-light min-h-screen font-sans">
                {children}
            </div>
        </>
    );
}
