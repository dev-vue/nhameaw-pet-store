import { Star, Play } from 'lucide-react';
import { Review } from '@/types/review';

interface ReviewCardProps {
    review: Review;
    className?: string;
}

const ReviewCard = ({ review, className = '' }: ReviewCardProps) => {
    const isVideo = (url: string) => {
        return url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') || url.includes('video');
    };

    return (
        <div className={`bg-white p-3 lg:p-4 border-b border-gray-light last:border-b-0 ${className}`} >
            {/* Review Content */}
            <div className="mb-3">
                {/* Review Author */}
                <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">{review.review_by}</span>
                </p>
                {/* Review Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 ${star <= review.review_rating
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
                    {review.review_desc}
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

            {review.file_list && review.file_list.length > 0 && (
                <div className="flex gap-x-2">
                    {review.file_list.slice(0, 3).map((file, index) => (
                        <div
                            key={file.uuid}
                            className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded border border-gray-light flex items-center justify-center overflow-hidden relative"
                        >
                            {isVideo(file.url) ? (
                                <div className="relative w-full h-full">
                                    <video
                                        src={file.url}
                                        className="w-full h-full object-cover"
                                        controls={false}
                                        muted
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Play className="w-3 h-3 lg:w-4 lg:h-4 text-white bg-black/50 rounded-full p-0.5" />
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={file.url}
                                    alt={`Review image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewCard; 