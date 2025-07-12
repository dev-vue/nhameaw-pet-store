'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from '@/components/ProductCard';
import HeroSlider from '@/components/HeroSlider';

import { MOCK_PRODUCTS, CATEGORIES, filters } from '@/constants';
import { SearchCategoryModal } from '@/components/form/modal-search-category';

export default function HomePage() {

  const [activeFilter, setActiveFilter] = useState(0);
  const [categorySearchModal, setCategorySearchModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState({
    id: 0,
    name: ""
  });

  async function SearchCategory(id: number, name: string) {
    console.log('id', id)
    console.log('name', name)
    setCategoryFilter({
      id: id,
      name: name
    })

    setCategorySearchModal(true)
  }

  return (
    <>
      <HeroSlider />
      {/* Categories Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">หมวดหมู่สินค้า</h3>
        <div className="relative">
          <Swiper
            spaceBetween={16}
            slidesPerView={CATEGORIES.length === 1 ? 1 : 1.5}
            breakpoints={{
              768: {
                slidesPerView: CATEGORIES.length === 1 ? 1 : 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: CATEGORIES.length === 1 ? 1 : 2,
                spaceBetween: 24,
              }
            }}
            modules={[Navigation, Pagination]}
            className="categories-swiper"
          >
            {CATEGORIES.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="relative rounded-lg overflow-hidden h-64">
                  <Image
                    src={category.imageUrl}
                    alt={category.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
                  {/* Desktop & Tablet Button - Hidden on Mobile */}
                  <div className="absolute inset-0  items-end p-4 lg:flex hidden">
                    <button className="bg-white text-black font-bold py-2 px-4 rounded-full"
                      onClick={() => SearchCategory(category.id, category.name)}
                    >
                      ดูสินค้า{category.name}
                    </button>
                  </div>
                </div>
                {/* Mobile- Hidden on Desktop & Tablet Button */}
                <div className="bg-opacity-30 items-end py-4 lg:hidden flex">
                  <button
                    type='button'
                    className="bg-white text-black font-bold py-2 px-4 rounded-full"
                    onClick={() => SearchCategory(category.id, category.name)}
                  >
                    ดูสินค้า{category.name}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">รายการสินค้าทั้งหมด</h3>
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={
                "cursor-pointer px-4 py-2 rounded-full whitespace-nowrap border " +
                (activeFilter === index
                  ? "bg-primary-light text-primary border-primary"
                  : "bg-white border-gray-300 hover:bg-gray-200")
              }
              onClick={() => setActiveFilter(index)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <SearchCategoryModal
        open={categorySearchModal}
        id={categoryFilter.id}
        name={categoryFilter.name}
        onClose={() => setCategorySearchModal(false)}
      />
    </>
  );
}
