import React from 'react';
import ProductCard from './ProductCard';
import { useInfiniteRelatedProducts, useProducts } from '@/lib/react-query/product';
import Loading from './common/Loading';
import { Product } from '@/types/product';

interface RelatedProductsProps {
    currentProductId: string;
    className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
    currentProductId,
    className = ''
}) => {

    const {
        data: productList,
        isLoading: productsLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteRelatedProducts({
        productId: currentProductId,
        size: 8,
    });

    const allProducts: Product[] = productList?.pages.flatMap(page => page.content ?? []) ?? [];

    return (
        <div className={`bg-white rounded-lg ${className}`}>
            <h2 className="text-lg lg:text-xl font-semibold text-black mb-4 lg:mb-6">
                สินค้าอื่นๆในหมวดเดียวกัน
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
                {
                    productsLoading ? <Loading className='w-full col-span-4' /> :
                        allProducts.length > 0 ? (
                            allProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8">
                                <p className="text-gray-500 text-lg">ไม่พบสินค้าที่ค้นหา</p>
                                <p className="text-gray-400 text-sm mt-2">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default RelatedProducts; 