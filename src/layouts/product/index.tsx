"use client";
import { JSX } from "react";

export type LayoutsProps = {
    children: JSX.Element | React.ReactNode;
};

export default function ProductLayout({ children }: LayoutsProps) {
    return (
        <>
            <div className="min-h-screen font-sans lg:bg-white bg-gray-light">
                {children}
            </div>
        </>
    );
}
