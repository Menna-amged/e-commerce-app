import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  let { numOfCartItem } = useContext(CartContext);
  let { numOfWishlistItem, getLoggedUserWishlist, wishlist } =
    useContext(WishlistContext);
  let { userLogin, setuserLogin } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);

  let navigate = useNavigate();

  function SignOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-neutral-200 fixed top-0 left-0 right-0 z-50 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center md:justify-between mx-auto py-3 ">
          <div className="md:flex items-center gap-5 ">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8 mx-5 s:mx-2 w-auto " alt="logo" />
            </Link>

            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } w-full md:block md:w-auto`}
              id="navbar-default"
            >
              {userLogin != null && (
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-3 rtl:space-x-reverse md:mt-0 md:border-0">
                  <li>
                    <NavLink
                      to=""
                      className="block py-2 px-3 text-gray-600"
                      onClick={closeMenu}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="products"
                      className="block py-2 px-3 text-gray-600"
                      onClick={closeMenu}
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="brands"
                      className="block py-2 px-3 text-gray-600"
                      onClick={closeMenu}
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className="block py-2 px-3 text-gray-600"
                      onClick={closeMenu}
                    >
                      Categories
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center absolute right-14 top-2.5 space-x-6 rtl:space-x-reverse">
            <div className="flex gap-4 ">
              {userLogin != null ? (
                <>
                  <div className="relative top-2.5 left-3 md:top-3.5">
                    <Link to="wishlist" className="py-1 ">
                      <i className="fa-regular fa-heart text-main fa-xl"></i>
                      <span className="absolute top-[-13px] left-[-9px] bg-red-600 text-white rounded-2xl text-sm px-1.5 py-0">
                        {numOfWishlistItem || wishlist.length}
                      </span>
                    </Link>
                  </div>
                  <div className="relative top-2.5 left-2 md:top-3.5">
                    <Link to="cart" className="py-1">
                      <i className="fa-solid fa-cart-shopping text-main fa-xl"></i>
                      <span className="absolute top-[-13px] left-[-9px] bg-red-600 text-white rounded-2xl text-sm px-1.5 py-0">
                        {numOfCartItem}
                      </span>
                    </Link>
                  </div>
                  <Link
                    onClick={SignOut}
                    className="cursor-pointer text-sm border-main border-2 rounded-md p-1.5 md:mt-2 hover:bg-main hover:text-white"
                  >
                    SignOut
                  </Link>
                </>
              ) : (
                <Link
                  className="text-sm border-main border-2 rounded-md p-1.5  hover:bg-main hover:text-white"
                  to="login"
                >
                  Sign In/Sign Up
                </Link>
              )}
            </div>
          </div>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex absolute top-2 right-2 items-center p-1  w-10 h-10 justify-center text-sm text-main border-main border-2 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
