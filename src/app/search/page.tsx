'use client'

import ProductCard from '@/components/ProductCard';
import { filters, MOCK_PRODUCTS } from '@/constants';
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState(0);

    useEffect(() => {
        // Console log all query params
        const category = searchParams.get('category');
        const searchText = searchParams.get('searchText');

        console.log('Query Params:', {
            category,
            searchText,
            allParams: Object.fromEntries(searchParams.entries())
        });
    }, [searchParams]);

    return (
        <section>
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        className={
                            "cursor-pointer px-4 py-2 rounded-full whitespace-nowrap border " +
                            (activeFilter === index
                                ? "bg-primary-light text-primary border-primary"
                                : "bg-white border-gray-300 hover:bg-gray-200")
                        }
                        onClick={() => setActiveFilter(index)}
                        type="button"
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
