import { Star, ChevronRight } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import { Button } from './ui/Button';

interface Review {
    id: string;
    rating: number;
    author: string;
    content: string;
    buyerCount: number;
    commentCount: number;
    images: string[];
}

interface ReviewSectionProps {
    productRating: number;
    reviews: Review[];
    onViewAllReviews?: () => void;
    className?: string;
}

const ReviewSection = ({
    productRating,
    reviews,
    onViewAllReviews,
    className = ''
}: ReviewSectionProps) => {
    return (
        <div className={`bg-white ${className}`}>
            {/* Review Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-light">
                <div className="flex items-center gap-x-2 text-lg lg:text-xl font-semibold">
                    <Star className="w-4 h-4 lg:w-5 lg:h-5 fill-warning text-warning" />
                    <span>{productRating.toFixed(1)}</span>
                    <span>คะแนนสินค้า</span>
                </div>
                <button
                    type="button"
                    onClick={onViewAllReviews}
                    className="flex items-center hover:text-primary transition-colors"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Reviews List */}
            <div className="divide-y divide-gray-light">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                    />
                ))}
            </div>

            {/* View All Reviews Button */}
            {reviews.length > 0 && (
                <div className="flex justify-center p-4 border-t border-gray-light">
                    <Button
                        variant="link"
                        onClick={onViewAllReviews}
                        rightIcon={<ChevronRight className="w-4 h-4 text-primary" />}
                        className="hover:text-primary-hover transition-colors text-sm lg:text-base"
                    >
                        ดูรีวิวทั้งหมด
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ReviewSection; 