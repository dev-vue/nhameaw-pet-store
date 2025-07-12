'use client'

import React from 'react'
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/constants';


export default function FavouritePage() {

    return (
        <section>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
