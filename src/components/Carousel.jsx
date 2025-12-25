import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);
  console.log(data);
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <Swiper slidesPerView={1} autoplay={{
    delay: 2000,          // 3 seconds
    disableOnInteraction: false,
  }}
  modules={[Autoplay]} loop>
      {data?.slice(0, 15)?.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="bg-gradient-to-r flex justify-evenly from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10">
            <div className="flex gap-10 justify-center h-[600px] items-center px-4">
              <div className="space-y-6">
                <h3 className="text-red-500 font-semibold font-sans text-sm">
                  Grow your beauty 
                </h3>
                <h1 className="text-4xl font-bold uppercase line-clamp-3 md:w-[500px] text-white">
                  {item.title}
                </h1>
                <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                  {item.description}
                </p>
                <button className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer">
                  Shop now
                </button>
              </div>
            </div>
            <div>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="bg-white/60 rounded-full w-[500px] mt-[20px] hover:scale-105 transition-all shadow-2xl shadow-red-400"
              />
            </div>
          </div>
        </SwiperSlide>
        
      ))}
    </Swiper>
  );
};
export default Carousel;
