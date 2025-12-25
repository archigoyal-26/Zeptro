import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import Breadcrums from "../components/Breadcrums";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();
  const [singleproductData, setSingleProductData] = useState("");
  const {addToCart} = useCart();

  const singleProductData = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/${params.id}`
      );
      const data = response.data;
      setSingleProductData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    singleProductData();
  }, []);

  const OriginalPrice = Math.round(singleproductData.price + (singleproductData.price * singleproductData.discountPercentage) / 100)
  return (
    <>
      {singleproductData ? (
        // title and description details
        <div className="px-4 pb-4 md:px-0">
            <Breadcrums title={singleproductData.title}/>
        <div className="max-w-6xl h-max flex gap-3 justify-center">
          <div>
            <img src={singleproductData.thumbnail} alt="" width={500} />
          </div>
          <div className="flex flex-col justify-center ">
            <h1 className="text-4xl">{singleproductData.title}</h1>
            <p className="line-clamp-3 my-2">{singleproductData.description}</p>

            {/* category brand and ratings section */}
            <p className="text-xl py-2 w-[150px] text-center rounded-md bg-red-500 text-white">
              Ratings: {singleproductData.rating}
            </p>
            <p className="text-xl py-2 w-[150px] rounded-md">
              Category: {singleproductData.category}
            </p>
            <p className="text-xl py-2 w-[150px] rounded-md">
              brand:{singleproductData.brand}
            </p>

            {/* price details */}
            <p className="font-bold text-red-500 text-xl">${singleproductData.price}<span className="text-xl line-through text-gray-800">${OriginalPrice}</span><span className="py-2 px-3 bg-red-500 text-white rounded-md m-2 my-3">${singleproductData.discountPercentage}% discount</span></p>

            {/* Manage quantity */}
            <div className="flex m-5 items-center gap-4">
                <label htmlFor="" className="font-medium text-sm text-gray-800">Quantity:</label>
                <input type="number" min={1} className="w-30 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"/>
            </div>

            {/* Add to cart button */}
            <button onClick={() => addToCart} className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 mt-5 items-center justify-center font-semibold">
              <IoCartOutline className="w-6 h-6" />
              Add to Cart
            </button>
          </div>
        </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};
export default SingleProduct;
