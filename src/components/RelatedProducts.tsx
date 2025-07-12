import React from 'react';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '@/constants/mockData';

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
    // Get related products (excluding current product)
    const relatedProducts = MOCK_PRODUCTS
        .filter(product => product.id !== currentProductId)
        .slice(0, 8); // Show only 8 related products

    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className={`bg-white rounded-lg ${className}`}>
            <div className="p-2 lg:p-6">
                <h2 className="text-lg lg:text-xl font-semibold text-black mb-4 lg:mb-6">
                    สินค้าอื่นๆในหมวดเดียวกัน
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4">
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard
                                product={product}
                            />
                        </div>
                    ))}
                </div>

                {/* Show message if no products */}
                {relatedProducts.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">ไม่พบสินค้าที่เกี่ยวข้อง</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts; 