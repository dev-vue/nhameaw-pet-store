'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
    {
        imageUrl: '/images/banner-demo.png',
        alt: 'Pet promotion'
    },
    {
        imageUrl: '/images/banner-demo.png',
        alt: 'Cat food sale'
    }
    // {
    //     imageUrl: '/images/banner-demo.png',
    //     alt: 'New dog toys'
    // }
];

const HeroSlider = () => {
    return (
        <section className="relative rounded-lg overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="hero-swiper h-full md:h-auto"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img src={slide.imageUrl} alt={slide.alt} className='w-full h-full object-cover' />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default HeroSlider; 