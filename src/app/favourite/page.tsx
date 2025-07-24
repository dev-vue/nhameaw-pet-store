'use client'

import React from 'react'
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { useFavourites } from '@/lib/react-query/favourite';
import Loading from '@/components/common/Loading';
import { useSession } from 'next-auth/react';

export default function FavouritePage() {

    const { data: session } = useSession();
    const lineUserId = session?.user?.id;

    const {
        data: favouriteList,
        isLoading: favouritesLoading,
        refetch
    } = useFavourites({
        lineUserId: lineUserId ?? "",
        page: 0,
        size: 99,
    });

    if (favouritesLoading) return <Loading fullscreen />

    // Check if there are no favorite items
    if (!favouriteList?.content || favouriteList.content.length === 0) {
        return (
            <section className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center">
                    <img
                        src="/images/204-no-data.png"
                        alt="No favorite items"
                        className="w-48 h-48 object-contain"
                    />
                    <p className="mt-4 text-subdube text-base">ยังไม่มีรายการ</p>
                </div>
            </section>
        )
    }

    return (
        <section>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {favouriteList.content.map((favourite) => (
                    <ProductCard key={favourite.id} product={favourite as Product} />
                ))}
            </div>
        </section>
    )
}
