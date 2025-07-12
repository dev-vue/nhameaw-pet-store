import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    children,
    defaultOpen = false
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full py-4 px-2 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-base font-medium text-gray-900">{title}</h3>
                <span className="text-primary">
                    {isOpen ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] pb-4 px-2' : 'max-h-0'
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

export default AccordionItem; 