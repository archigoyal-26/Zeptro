import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCarOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = ({location, getlocation, opendropdown, setdropdown}) => {
    const toggledropdown = () => {
        setdropdown(!opendropdown);
    }
    const {cartItem} = useCart();
  return (
    <div className="bg-white py-3 shadow-2xl sticky">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo section */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500">Z</span>aptro
            </h1>
          </Link>
          <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-rose-500" />
            <span className="font-semibold">
              {location ? 
              <div>
                <p>{location.county}</p>
                <p>{location.state}</p>
            </div> : "Add address"}
            </span>
            <FaCaretDown onClick={toggledropdown}/>
            {
                opendropdown 
                ? <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-40 border-2 p-5 border-gray-100 rounded-md">
                    <h1 className="font-semibold text-xl mb-4 flex justify-between">Change location<span onClick={toggledropdown}><CgClose /></span></h1>
                    <button onClick={getlocation} className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-400">
                        Detact my location
                    </button>
                </div>
                : null
            }
          </div>
        </div>
        {/* Menu section */}
        <nav className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <NavLink to={"/"}>
              <li>Home</li>
            </NavLink>
            <NavLink to={"/products"}>
              <li>Products</li>
            </NavLink>
            <NavLink to={"/about"}>
              <li>About</li>
            </NavLink>
            <NavLink to={"/contact"}>
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <IoCarOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartItem.length}
            </span>
          </Link>
          <div className="cursor-pointer">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white rounded p-1 px-2" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
