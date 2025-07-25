'use client';

import { Product } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: Product }) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/product/${product.id}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden group hover:-translate-y-1.5 transition-all cursor-pointer h-full flex flex-col"
            onClick={handleCardClick}
        >
            <div className="relative aspect-square">
                <Image
                    src={product.imageUrl ?? ""}
                    alt={product.name ?? ""}
                    fill
                    className="object-contain p-2"
                />
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    {
                        product.forPets?.map((pet, petIndex) => (
                            <button key={petIndex} className="bg-[#E6E9FF] p-1.5 lg:p-2 rounded-full shadow-md">
                                <img src={`/icons/category-${pet.toLowerCase()}.png`} alt={pet} className="w-5 h-5" />
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className="p-3 lg:p-4 flex-1 flex flex-col">
                <h4 className="font-semibold text-xs lg:text-sm line-clamp-2 mb-2 flex-1">{product.name}</h4>
                <div className="flex flex-wrap items-baseline gap-x-2 mb-2">
                    <p className="font-semibold text-sm lg:text-lg text-primary">฿{product.price ?? "0"}</p>
                    {product.originalPrice && (
                        <p className="text-xs text-subdube line-through">฿{product.originalPrice ?? "0"}</p>
                    )}
                </div>
                <hr className="border-gray-200 mb-2" />
                <div className="flex items-center">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs lg:text-sm text-black ml-1">{product.rating}</span>
                    <span className="text-xs lg:text-sm text-gray-400 mx-1">|</span>
                    <span className="text-xs lg:text-sm text-black">ขายแล้ว {product.sold} ชิ้น</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard; 