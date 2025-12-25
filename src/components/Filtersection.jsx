import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Filtersection = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  onCategoryChange,
  onBrandChange
}) => {
  const { categoryData, brandData } = useContext(DataContext);
  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />

      {/* fetch data Category wise */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryData?.map((item, index) => {
          return (
            <div className="flex gap-2" key={index}>
              <input 
              type="checkbox" 
              name={item}
              value={item}
              checked={category === item}
              onChange={onCategoryChange}
              />
              <button className="cursor-pointer uppercase">{item}</button>
            </div>
          );
        })}
      </div>

      {/* fetch data brand wise */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        name=""
        id=""
        value={brand}
        onChange={onBrandChange}
        className="bg-white py-3 rounded-md w-full uppercase"
      >
        {brandData?.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>

      {/* price range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col py-2 px-1 gap-2">
        <label htmlFor="">Price range: ${priceRange[0]} - ${priceRange[1]}</label>
        <input type="range" min="0" max="5000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}/>
      </div>
      <button onClick={() => {setSearch(''); setCategory("All"); setBrand("All"); setPriceRange([0, 5000])}} className="bg-red-500 w-full text-white rounded-md px-3 py-1 mt-5 cursor-pointer">
        Reset filters
      </button>
    </div>
  );
};

export default Filtersection;
