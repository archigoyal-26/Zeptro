import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import SingleProduct from "./pages/SingleProduct";

const App = () => {
  const [location, setlocation] = useState();
  const [opendropdown, setdropdown] = useState();
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setlocation(exactLocation);
        setdropdown(false);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} setdropdown={setdropdown} opendropdown={opendropdown}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart location={location} getLocation={getLocation}/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
