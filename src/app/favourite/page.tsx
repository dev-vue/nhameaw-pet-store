'use client'

import React from 'react'
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/constants';
import { Product } from '@/types/product';
import { useProducts } from '@/lib/react-query/product';

export default function FavouritePage() {

    const {
        data: productList,
        isLoading: productsLoading,
        refetch
    } = useProducts({
        keyword: "",
        page: 0,
        size: 8,
    });

    return (
        <section>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {productList?.content?.map((product) => (
                    <ProductCard key={product.id} product={product as Product} />
                ))}
            </div>
        </section>
    )
}
