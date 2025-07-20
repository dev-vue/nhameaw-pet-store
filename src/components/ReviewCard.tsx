import { Star } from 'lucide-react';

interface Review {
    id: string;
    rating: number;
    author: string;
    content: string;
    buyerCount: number;
    commentCount: number;
    images: string[];
}

interface ReviewCardProps {
    review: Review;
    className?: string;
}

const ReviewCard = ({ review, className = '' }: ReviewCardProps) => {

    return (
        <div className={`bg-white p-3 lg:p-4 border-b border-gray-light last:border-b-0 ${className}`} >
            <div className="flex items-center gap-x-2 mb-2 lg:mb-3">
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-3 h-3 lg:w-4 lg:h-4 ${star <= review.rating ? 'fill-warning text-warning' : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
                <span className="text-xs lg:text-sm text-gray-600">{review.rating.toFixed(1)} คะแนนสินค้า</span>
            </div>

            <p className="text-xs lg:text-sm text-gray-700 mb-2 lg:mb-3 leading-relaxed">
                {review.author}
            </p>

            <p className="text-xs lg:text-sm text-gray-700 mb-2 lg:mb-3 leading-relaxed line-clamp-2">
                {review.content}
            </p>


            <div className="flex items-center gap-x-2 mb-1">
                <span className="text-xs text-gray-500">ผู้ซื้อ :</span>
                <span className="text-xs text-gray-500">{review.buyerCount}</span>
            </div>

            <div className="flex items-center gap-x-2 mb-2 lg:mb-3">
                <span className="text-xs text-gray-500">ความเห็น :</span>
                <span className="text-xs text-gray-500">{review.commentCount}</span>
            </div>

            {review.images.length > 0 && (
                <div className="flex gap-x-2">
                    {review.images.map((image, index) =>
                        index <= 2 && <div
                            key={index}
                            className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded border border-gray-light flex items-center justify-center"
                        >
                            <img
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-8 h-8 lg:w-12 lg:h-12 object-contain"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewCard; 