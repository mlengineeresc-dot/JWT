import React from "react";
import Input from "../common/ui/Input";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Navbar = () => {
const count = useSelector((state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
);
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black h-16 mx-auto flex justify-around items-center z-50 shadow-md">
        <Link to="/">
          <div className="flex justify-center align-center border-gray-200 h-10">
            <img
              src="https://cdnnew.interflora.in/interflora/assets/images/logo-interflora-phone-new.png"
              alt="logo"
              className="h-14"
            />
          </div>
        </Link>
        <div className="bg-[#1f1f1f] flex h-10 rounded justify-around items-center border w-[400px]">
          <Input
            type="search"
            className="w-[350px]  bg-[#1f1f1f] px-2 text-white focus:outline-none "
            placeholder="Search for flowers"
          />
          <i className="fa-solid fa-magnifying-glass text-white "></i>
        </div>
        <div className="flex justify-around items-center w-[160px]">
          <Link to="/addproduct">
            <i className="fa-solid fa-plus text-gray-200"></i>
          </Link>

          <i className="fa-regular fa-heart text-gray-200"></i>
          <Link to="/cart" className="relative flex items-center">
            <i className="fa-solid fa-cart-shopping text-gray-200 text-lg"></i>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {count}
              </span>
            )}
          </Link>

          <i className="fa-regular fa-user text-gray-200"></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
