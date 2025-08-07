"use client";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { JSX } from "react";

export type LayoutsProps = {
    children: JSX.Element | React.ReactNode;
};

export default function MainGreyLayout({ children }: LayoutsProps) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen font-sans py-32 md:py-28 bg-gray-light">
            {children}
        </div>
    );
}
