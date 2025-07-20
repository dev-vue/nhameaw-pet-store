import React, { useState } from 'react';
import { Star, Play } from 'lucide-react';
import Modal from './Modal';
import ImageViewer from './ImageViewer';
import { useRouter } from 'next/navigation';

interface Review {
    id: string;
    rating: number;
    author: string;
    content: string;
    buyerCount: number;
    commentCount: number;
    images: string[];
}

interface ReviewsModalProps {
    open: boolean;
    onClose: () => void;
    reviews: Review[];
    productRating: number;
    productName: string;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
    open,
    onClose,
    reviews,
    productRating,
    productName
}) => {
    const { push } = useRouter();
    const [imageViewerOpen, setImageViewerOpen] = useState(false);
    const [currentMedia, setCurrentMedia] = useState<string[]>([]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const isVideo = (url: string) => {
        return url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') || url.includes('video');
    };

    const openImageViewer = (media: string[], index: number) => {
        setCurrentMedia(media);
        setCurrentMediaIndex(index);
        setImageViewerOpen(true);
    };


    const renderMediaGrid = (media: string[]) => {
        if (media.length === 0) return null;

        const totalMedia = media.length;
        const remainingCount = totalMedia - 4;

        if (totalMedia === 1) {
            return (
                <div className="grid grid-cols-1 gap-2 max-w-full">
                    <div
                        className="aspect-square bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                        onClick={() => openImageViewer(media, 0)}
                    >
                        {isVideo(media[0]) ? (
                            <div className="relative w-full h-full">
                                <video
                                    src={media[0]}
                                    className="w-full h-full object-cover"
                                    controls={false}
                                    muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={media[0]}
                                alt="Review media"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            );
        }

        if (totalMedia === 2) {
            return (
                <div className="grid grid-cols-2 gap-2 max-w-full">
                    {media.slice(0, 2).map((item, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                            onClick={() => openImageViewer(media, index)}
                        >
                            {isVideo(item) ? (
                                <div className="relative w-full h-full">
                                    <video
                                        src={item}
                                        className="w-full h-full object-cover"
                                        controls={false}
                                        muted
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white bg-black/50 rounded-full p-0.5" />
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={item}
                                    alt={`Review media ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        if (totalMedia === 3) {
            return (
                <div className="grid grid-cols-3 grid-rows-2 gap-2 max-w-full h-auto">
                    {/* First image - spans 2 rows */}
                    <div
                        className="col-span-2 row-span-2 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                        onClick={() => openImageViewer(media, 0)}
                    >
                        {isVideo(media[0]) ? (
                            <div className="relative w-full h-full">
                                <video
                                    src={media[0]}
                                    className="w-full h-full object-cover"
                                    controls={false}
                                    muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play className="w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={media[0]}
                                alt="Review media 1"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    {/* Second image */}
                    <div
                        className="col-span-1 row-span-1 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                        onClick={() => openImageViewer(media, 1)}
                    >
                        {isVideo(media[1]) ? (
                            <div className="relative w-full h-full">
                                <video
                                    src={media[1]}
                                    className="w-full h-full object-cover"
                                    controls={false}
                                    muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play className="w-4 h-4 text-white bg-black/50 rounded-full p-0.5" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={media[1]}
                                alt="Review media 2"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    {/* Third image */}
                    <div
                        className="col-span-1 row-span-1 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                        onClick={() => openImageViewer(media, 2)}
                    >
                        {isVideo(media[2]) ? (
                            <div className="relative w-full h-full">
                                <video
                                    src={media[2]}
                                    className="w-full h-full object-cover"
                                    controls={false}
                                    muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play className="w-4 h-4 text-white bg-black/50 rounded-full p-0.5" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={media[2]}
                                alt="Review media 3"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>
            );
        }

        if (totalMedia === 4) {
            return (
                <div className="grid grid-cols-2 gap-2 max-w-full">
                    {media.map((item, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                            onClick={() => openImageViewer(media, index)}
                        >
                            {isVideo(item) ? (
                                <div className="relative w-full h-full">
                                    <video
                                        src={item}
                                        className="w-full h-full object-cover"
                                        controls={false}
                                        muted
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white bg-black/50 rounded-full p-0.5" />
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={item}
                                    alt={`Review media ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        // More than 4 images - show 4 with overlay on the fourth
        return (
            <div className="grid grid-cols-2 gap-2 max-w-full">
                {/* First 3 images */}
                {media.slice(0, 3).map((item, index) => (
                    <div
                        key={index}
                        className="aspect-square bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                        onClick={() => openImageViewer(media, index)}
                    >
                        {isVideo(item) ? (
                            <div className="relative w-full h-full">
                                <video
                                    src={item}
                                    className="w-full h-full object-cover"
                                    controls={false}
                                    muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Play className="w-4 h-4 text-white bg-black/50 rounded-full p-0.5" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={item}
                                alt={`Review media ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                ))}
                {/* Fourth image with overlay */}
                <div
                    className="aspect-square bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden relative cursor-pointer"
                    onClick={() => openImageViewer(media, 3)}
                >
                    {isVideo(media[3]) ? (
                        <div className="relative w-full h-full">
                            <video
                                src={media[3]}
                                className="w-full h-full object-cover"
                                controls={false}
                                muted
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-4 h-4 text-white bg-black/50 rounded-full p-0.5" />
                            </div>
                        </div>
                    ) : (
                        <img
                            src={media[3]}
                            alt="Review media 4"
                            className="w-full h-full object-cover"
                        />
                    )}
                    {/* Overlay with count */}
                    <div className="absolute bottom-2 right-2 bg-black/60 rounded-full px-2 py-1">
                        <span className="text-white font-semibold text-sm">
                            +{remainingCount}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                header="รีวิวจากผู้ใช้จริง"
                subHeader='จากทุกช่องทางการจัดจำหน่าย'
                size="md"
            >
                <div className="space-y-4 pb-44 md:pb-0">
                    {/* Product Rating Summary */}
                    <div className="flex items-center gap-2 mb-5">
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-warning text-warning" />
                            <span className="text-xl font-bold">{productRating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-600">คะแนนสินค้า</span>
                    </div>
                    <hr className="border-gray-light" />

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div key={review.id} className="bg-white p-4">
                                {/* Review Content */}
                                <div className="mb-3">
                                    {/* Review Author */}
                                    <p className="text-sm text-gray-700 mb-2">
                                        <span className="font-medium">{review.author}</span>
                                    </p>
                                    {/* Review Rating */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= review.rating
                                                        ? 'fill-warning text-warning'
                                                        : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-sm text-subdube mb-2">
                                        <span className="font-medium">ตัวเลือกสินค้า : 25 ml</span>
                                    </p>
                                    {/* Review Content */}
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {review.content}
                                    </p>
                                </div>

                                <div className='pb-3'>
                                    <span className="text-sm flex gap-x-2">
                                        <p className='text-subdube'>คุณภาพ :</p><p>ดี</p>
                                    </span>
                                    <span className="text-sm flex gap-x-2">
                                        <p className='text-subdube'>ความคุ้มค่า :</p><p>ดี</p>
                                    </span>
                                </div>

                                {/* Review Images/Videos */}
                                {review.images.length > 0 && (
                                    <div className="mb-3">
                                        {renderMediaGrid(review.images)}
                                    </div>
                                )}

                                {/* Review Stats */}
                                <div className="flex items-center gap-4 text-xs text-subdube py-2 border-b border-gray-light">
                                    2025-05-20 17:52
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {reviews.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-gray-400 mb-2">
                                <Star className="w-12 h-12 mx-auto opacity-50" />
                            </div>
                            <p className="text-gray-500">ยังไม่มีรีวิวสำหรับสินค้านี้</p>
                        </div>
                    )}
                </div>
            </Modal>

            {/* Image Viewer */}
            <ImageViewer
                media={currentMedia}
                currentIndex={currentMediaIndex}
                isOpen={imageViewerOpen}
                onClose={() => setImageViewerOpen(false)}
                onIndexChange={setCurrentMediaIndex}
            />
        </>
    );
};

export default ReviewsModal; 