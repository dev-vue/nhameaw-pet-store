'use client'

import ProductCard from '@/components/ProductCard';
import { filters } from '@/constants';
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation';
import { useInfiniteProducts } from '@/lib/react-query/product';
import { Product } from '@/types/product';
import Loading from '@/components/common/Loading';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState("BSP");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchproductCategoryId, setSearchproductCategoryId] = useState<number | null>(null);

    const {
        data: productList,
        isLoading: productsLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteProducts({
        keyword: searchKeyword,
        productCategoryId: searchproductCategoryId ?? null,
        size: 8,
        sortDirection: activeFilter
    });

    // Get all products from infinite query pages
    const allProducts: Product[] = productList?.pages.flatMap(page => page.content ?? []) ?? [];

    // Intersection Observer for infinite loading
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        // Get search parameters and update search keyword
        const category = searchParams.get('category');
        const searchtext = searchParams.get('searchtext');

        // Set search keyword from URL params
        const keyword = searchtext || "";
        const categoryId = Number(category) || null;

        setSearchKeyword(keyword);
        setSearchproductCategoryId(categoryId);
    }, [searchParams]);

    // Refetch when search keyword or filter changes
    useEffect(() => {
        if (searchKeyword !== undefined || searchproductCategoryId !== null) {
            refetch();
        }
    }, [searchKeyword, activeFilter, refetch, searchproductCategoryId]);

    const getSearchTitle = () => {
        const searchtext = searchParams.get('searchtext');
        const category = searchParams.get('category');

        if (searchtext) {
            return `ผลการค้นหา "${searchtext}"`;
        } else if (category) {
            return `หมวดหมู่ "${category}"`;
        }
        return "รายการสินค้า";
    };

    return (
        <>
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 bg-white lg:container mx-auto px-4">
                {filters.map((filter, index) => (
                    <button
                        key={index}
                        className={
                            "cursor-pointer px-4 py-2 rounded-full whitespace-nowrap border " +
                            (activeFilter === filter.value
                                ? "bg-primary-light text-primary border-primary"
                                : "bg-white border-gray-300 hover:bg-gray-200")
                        }
                        onClick={() => setActiveFilter(filter.value)}
                        type="button"
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <section className='bg-gray-light min-h-screen '>
                <div className='lg:container mx-auto px-4 py-5'>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            productsLoading ? <Loading className='w-full col-span-4' /> :
                                allProducts.length > 0 ? (
                                    allProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-8">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src="/images/204-no-data.png"
                                                alt="No favorite items"
                                                className="w-48 h-48 object-contain"
                                            />
                                            <p className="mt-4 text-subdube text-base">ยังไม่มีรายการ</p>
                                        </div>
                                    </div>
                                )
                        }
                    </div>

                    {/* Intersection Observer Target */}
                    <div ref={loadMoreRef} className="h-10 w-full" />

                    {/* Load More Indicator */}
                    {isFetchingNextPage && (
                        <div className="flex justify-center mt-6 w-full">
                            <Loading className='w-full' />
                        </div>
                    )}

                    {/* Results Count */}
                    {!productsLoading && allProducts.length > 0 && (
                        <div className="text-center mt-6 text-gray-500">
                            <p>แสดง {allProducts.length} รายการ {hasNextPage && "ของสินค้าทั้งหมด"}</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
