import React from 'react';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '@/constants/mockData';
import { useProducts } from '@/lib/react-query/product';

interface RelatedProductsProps {
    currentProductId: number;
    category?: string;
    className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
    currentProductId,
    category,
    className = ''
}) => {
    const { data: productList, isLoading: productListLoading, refetch: productListRefetch } = useProducts({
        keyword: "",
        page: 0,
        size: 10,
        sortDirection: "BSP"
    });

    // Get related products (excluding current product)
    const relatedProducts = MOCK_PRODUCTS
        .filter(product => product.id !== currentProductId)
        .slice(0, 8); // Show only 8 related products

    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className={`bg-white rounded-lg ${className}`}>
            <h2 className="text-lg lg:text-xl font-semibold text-black mb-4 lg:mb-6">
                สินค้าอื่นๆในหมวดเดียวกัน
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
                {productList?.content?.map((product) => (
                    <div key={product.id} className="h-full">
                        <ProductCard
                            product={product}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts; 