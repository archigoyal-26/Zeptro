import React, { useContext, useEffect, useEffectEvent, useState } from "react";
import { DataContext } from "../context/DataContext";
import Loading from "../assets/Loading4.webm";
import Filtersection from "../components/Filtersection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const Products = () => {
  const { data, fetchAllProducts } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const onBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const pageHandler = (selected) => {
    setPage(selected);
  }
  const filteredData = data?.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });

  const dynamicPage = Math.ceil(filteredData?.length / 8);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {data?.length > 0 ? (
          <>
          <div className="flex gap-8">
            <Filtersection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onCategoryChange={onCategoryChange}
              onBrandChange={onBrandChange}
            />
            <div className="grid grid-cols-4 mt-10">
              {filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>
          </div>
          <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage}/>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
