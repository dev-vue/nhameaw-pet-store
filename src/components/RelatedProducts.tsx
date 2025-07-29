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
        <>
            <div className='lg:container mx-auto space-y-8 lg:pt-8 py-5 lg:px-5 px-0'>
                <h2 className="text-lg lg:text-xl font-semibold text-black lg:mb-6 mb-4 px-4 lg:bg-white bg-gray-light">
                    สินค้าอื่นๆที่คุณอาจสนใจ
                </h2>
            </div>

            <div className={`bg-gray-light rounded-lg  ${className}`}>
                <div className='lg:container mx-auto space-y-8 lg:pt-8 pb-5 lg:px-5 px-0'>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4 px-3">
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
            </div>
        </>

    );
};

export default RelatedProducts; 