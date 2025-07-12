import React from 'react';
import Image from 'next/image';

export default function HowToOrderPage() {
    return (
        <section className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative w-full">
                    <Image
                        src="/images/how-to-buy.jpg"
                        alt="วิธีการสั่งซื้อสินค้าออนไลน์ - How to Shop Online Step by Step Guide"
                        width={1083}
                        height={855}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
