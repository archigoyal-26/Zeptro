import axios from "axios";
import { createContext, useState } from "react";

export const DataContext = createContext(null);

export const Dataprovider = ({children}) => {
    const [data, setData] = useState([])
    // fetch all 150 products data here
    const fetchAllProducts = async () =>{
        try {
            const response = await axios.get("https://dummyjson.com/products?limit=150");
            setData(response.data.products);
        } catch (error) {
            console.log(error);
        }
    }
      const getCategories = (data, property) => {
        let category = data?.map((cat) => {
          return cat[property];
        });
        category = ["All", ...new Set(category)];
        return category;
      };
    
      const categoryData = getCategories(data, "category");
      const brandData = getCategories(data, "brand")
    return (
        <DataContext.Provider value={{data, setData, fetchAllProducts, categoryData, brandData}}>
            {children}
        </DataContext.Provider>
    )
}