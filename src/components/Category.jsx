import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";


const Category = () => {
  const { data, fetchAllProducts, categoryData } = useContext(DataContext);
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <>
  <h1 className="bg-gradient-to-r from-red-500 to-purple-500 text-white text-4xl font-semibold py-3 uppercase text-center">
    Shop by Category
  </h1>

  <div className="bg-[#101829] py-10">
    <Swiper
      slidesPerView={5}          // 👈 ek time me 5 categories
      spaceBetween={20}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      className="max-w-7xl mx-auto px-4"
      breakpoints={{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
    >
      {categoryData.slice(0, 6).map((item, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center">
            <button className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md transition-all cursor-pointer">
              {item}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</>

  );
};

export default Category;
