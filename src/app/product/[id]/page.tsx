'use client';

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeft, Star, Heart, MessageCircle, ChevronRight, Share } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getProductById, getReviewsByProductId } from '@/constants/mockData'
import ReviewSection from '@/components/ReviewSection'
import ProductAccordion from '@/components/ProductAccordion'
import RelatedProducts from '@/components/RelatedProducts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import ModalBottom from '@/components/common/ModalBottom';
import ProductSelect from '@/components/ProductSelect';
import ReviewsModal from '@/components/common/ReviewsModal';
import { swal } from '@/components/common/SweetAlert';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { push } = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false);
    const [modalAddtoCart, setModalAddtoCart] = useState(false);
    const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

    // Mock product data - you can replace this with actual API call
    const product = getProductById(Number(id)) || {
        id: Number(id),
        name: 'O3vit 50 ml อาหารเสริมยันต์ไข่ สำหรับแมว/สุนัข กำจัดสวย แฮนเรง มิดแล้ว เสริมภูมิ ขนาด 50 ml.',
        rating: 5.0,
        reviews: '9.3พัน',
        price: 1050,
        originalPrice: 1250,
        imageUrl: '/images/product-demo-rm-bg.png',
    };

    // Get reviews for this product
    const reviews = getReviewsByProductId(Number(id));

    // Mock multiple product images
    const productImages = [
        '/images/product-demo-rm-bg.png',
        '/images/product-demo-rm-bg.png',
        '/images/product-demo-rm-bg.png'
    ];

    // const handleBackClick = () => {
    //     router.back();
    // };

    const handleShare = () => {
        // Implement share functionality
        navigator.share?.({
            title: product.name,
            text: `ดูสินค้านี้ ${product.name}`,
            url: window.location.href,
        });
    };

    const handleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    const handleViewAllReviews = () => {
        setReviewsModalOpen(true);
    };

    const pagination = {
        clickable: true,
        el: '.swiper-custom-pagination',
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + ' !w-14 !h-14 !rounded-[14px] mx-1 !bg-white border !border-gray-light"><img src="' + productImages[index] + '" class="!rounded-[14px] w-full h-full object-cover" /></span>';
        },
    };



    return (
        <div className="min-h-screen pb-20">
            {/* Unified Responsive Layout */}
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Product Images Section */}
                    <div className="relative order-1 lg:order-1">
                        <div className="relative">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                loop={true}
                                className="aspect-square product-swiper"
                                onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
                                pagination={pagination}
                            >
                                {productImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="aspect-square bg-white flex items-center justify-center lg:border lg:rounded-[20px] lg:border-gray-light">
                                            <img
                                                src={image}
                                                alt={`${product.name} - รูปที่ ${index + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Image Counter */}
                            <div className="absolute md:bottom-28 bottom-16 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm z-20">
                                {currentImageIndex + 1}/{productImages.length}
                            </div>

                            {/* Custom Navigation Buttons */}
                            {productImages.length > 1 && (
                                <>
                                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full z-10 hover:bg-black/40 transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full z-10 hover:bg-black/40 transition-colors">
                                        <ChevronLeft className="w-5 h-5 rotate-180" />
                                    </button>
                                </>
                            )}

                            {/* Custom Pagination */}
                            <div className="swiper-custom-pagination flex justify-center mt-4"></div>
                        </div>
                    </div>

                    {/* Product Information Section */}
                    <div className="order-2 lg:order-2 space-y-4 lg:space-y-6">
                        {/* Product Name & Price */}
                        <div className="bg-white px-4 lg:px-6">
                            {/* Price Section - Mobile First */}
                            <div className="mb-4 lg:mb-6 lg:order-2">
                                <div className="flex items-center space-x-2 lg:space-x-3 mb-2 lg:mb-3">
                                    <span className="text-2xl lg:text-3xl font-bold text-primary">฿{product.price.toLocaleString()}</span>
                                    {product.originalPrice && (
                                        <span className="text-lg lg:text-xl text-gray-500 line-through">฿{product.originalPrice.toLocaleString()}</span>
                                    )}
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-between space-x-2 mb-3 lg:mb-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center py-2">
                                            <Star className="w-4 h-4 lg:w-5 lg:h-5 fill-warning text-warning" />
                                            <span className="text-sm lg:text-base text-black ml-1 lg:ml-2">{product.rating.toFixed(1)}</span>
                                            <span className="text-sm lg:text-base text-gray-light mx-1 lg:mx-2">|</span>
                                            <span className="text-xs lg:text-base text-black">ขายแล้ว {product.reviews} ชิ้น</span>
                                        </div>
                                        <span className="text-sm text-subdube">ยอดขายและรีวิวจากทุกช่องทางการจัดจำหน่าย</span>
                                    </div>
                                    <button type='button' className='flex items-center space-x-2' onClick={handleViewAllReviews}>
                                        <span className="text-base lg:text-lg text-secondary whitespace-nowrap">
                                            กดดูรีวิวอื่นๆ
                                        </span>
                                        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                                    </button>
                                </div>
                            </div>

                            {/* Product Name - Mobile After Price */}
                            <h1 className="text-lg lg:text-xl font-medium lg:font-semibold text-black mb-4 lg:mb-6 leading-6 lg:leading-7 lg:order-1">
                                {product.name}
                            </h1>

                            {/* Action Icons */}
                            <div className="flex items-center justify-between pb-3 lg:pb-6 mb-4 lg:mb-6 border-b border-gray-200 lg:order-3">
                                <div className="flex items-center space-x-4 lg:space-x-6">
                                    <button
                                        onClick={handleShare}
                                        className="flex flex-col justify-center items-center text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <Share className="w-5 h-5 lg:w-6 lg:h-6" />
                                        <span className="text-sm mt-1">แชร์</span>
                                    </button>
                                    <button
                                        onClick={handleFavorite}
                                        className="flex flex-col justify-center items-center text-gray-600 hover:text-primary transition-colors"
                                    >
                                        <Heart className={`w-5 h-5 lg:w-6 lg:h-6 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
                                        <span className="text-sm mt-1">ถูกใจ</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white p-4 lg:p-6">
                            <div className="space-y-4">
                                {/* Guarantee Section */}
                                <div className="flex items-start space-x-3">
                                    <img src="/icons/shieldcheck.png" alt="Shield" className="w-5 h-5 lg:w-6 lg:h-6" />
                                    <span className="text-sm lg:text-base text-gray-800">ปลอดภัย รับประกันสินค้าของแท้ 100%</span>
                                </div>

                                {/* Delivery Info */}
                                <div className="flex items-start space-x-3">
                                    <img src="/icons/docpet.png" alt="docpet" className="w-5 h-5 lg:w-6 lg:h-6" />
                                    <span className="text-sm lg:text-base text-gray-800">
                                        คุณกับคอมเมอร์เชียลซูเปอร์เซี่ยงให้เคลทาสปลอง
                                        ส่วนเทพเยอร์ก้อยก้าย
                                    </span>
                                </div>

                                {/* Return Policy */}
                                <div className="flex items-start space-x-3">
                                    <img src="/icons/chat.png" alt="chat" className="w-5 h-5 lg:w-6 lg:h-6" />
                                    <span className="text-sm lg:text-base text-gray-800">บริการส่งแล้วแพทย์สำเร็จรูปสินค้าและการใช้ชินค่า</span>
                                </div>

                                {/* Company Info */}
                                <div className="flex items-start space-x-3">
                                    <img src="/icons/users.png" alt="users" className="w-5 h-5 lg:w-6 lg:h-6" />
                                    <div className="text-sm lg:text-base text-gray-800">
                                        <div>สินค้าจากพาทเวาร์โมบิล์ CSR VET GROUP
                                            CO., LTD. ประสบการณ์และเทคโนโลยีสำหรับ
                                            สัตวแพทย์กว่า 7 ปี
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Time */}
                                <div className="flex items-start space-x-3">
                                    <img src="/icons/package-send.png" alt="users" className="w-5 h-5 lg:w-6 lg:h-6" />
                                    <span className="text-sm lg:text-base text-gray-800">จัดส่งสินค้าทุกวัน เมื่อสั่งซื้อก่อน 14.00 น.</span>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="order-3 lg:order-3">
                            <ReviewSection
                                productRating={product.rating}
                                reviews={reviews}
                                onViewAllReviews={handleViewAllReviews}
                                className="mt-2 lg:mt-6"
                            />
                        </div>

                        {/* Product Accordion */}
                        <div className="order-4 lg:order-4 mt-4">
                            <ProductAccordion productDetails={product} />
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-6 lg:mt-8">
                    <RelatedProducts
                        currentProductId={product.id}
                        category={product.category}
                    />
                </div>
            </div>

            {/* Fixed Bottom Action Buttons */}
            <div className="z-50 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-end space-x-3">
                        <Button
                            variant="secondary"
                            className="flex lg:flex-initial flex-1 bg-gray-600 hover:bg-gray-700 border-gray-600 lg:min-w-[140px]"
                            leftIcon={<MessageCircle className="w-4 h-4" />}
                        >
                            แชทสอบถาม
                        </Button>
                        <Button
                            variant="default"
                            className="lg:flex-initial flex-1 bg-primary hover:bg-primary-hover border-primary lg:min-w-[360px]"
                            onClick={() => setModalAddtoCart(true)}
                        >
                            ดูตัวเลือกสินค้านี้
                        </Button>
                    </div>
                </div>
            </div>

            {/* Product Selection Modal */}
            <ModalBottom
                open={modalAddtoCart}
                onClose={() => setModalAddtoCart(false)}
                header="ตัวเลือกสินค้า"
                size="lg"
            >
                <ProductSelect
                    id={product.id}
                    onClose={() => setModalAddtoCart(false)}
                    onAddToCart={(selectedOptions) => {
                        console.log('selectedOptions', selectedOptions)
                        setModalAddtoCart(false);
                        swal.fire({
                            icon: "success",
                            title: "เพิ่มสินค้าไปยังตะกร้าเรียบร้อย",
                            text: "คุณต้องการดำเนินการอย่างไรต่อ",
                            confirmButtonText: "ตรวจสอบสินค้าในตะกร้า",
                            denyButtonText: "เลือกซื้อสินค้าต่อ",
                            showDenyButton: true,

                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                push('/my-cart')
                            }
                        });
                    }}
                />
            </ModalBottom>

            {/* Reviews Modal */}
            <ReviewsModal
                open={reviewsModalOpen}
                onClose={() => setReviewsModalOpen(false)}
                reviews={reviews}
                productRating={product.rating}
                productName={product.name}
            />
        </div>
    );
}
