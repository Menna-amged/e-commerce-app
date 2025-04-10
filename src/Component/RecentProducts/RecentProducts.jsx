import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts() {
  let {
    wishlist,
    setwishlist,
    getLoggedUserWishlist,
    addProductToWishlist,
    deleteProductFromWishlist,
    isInWishlist,
    numOfWishlistItem,
    setnumOfWishlistItem,
  } = useContext(WishlistContext);

  console.log(wishlist);

  let { data, error, isError, isFetching, isLoading } = useProducts();
  let { addProductToCart, setnumOfCartItem } = useContext(CartContext);
  const [loading, setloading] = useState(false);
  const [currentId, setcurrentId] = useState(0);

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);

    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      toast.success(response.data.message);
      setloading(false);
      setnumOfCartItem(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    );
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      <h2 className="capitalize text-gray-500 font-semibold  px-5 pt-5  text-3xl text-left">
        popular Products
      </h2>
      <div className="row">
        {data.map((product) => {
          let isFavourite = isInWishlist(product.id);

          return (
            <div key={product.id} className="w-full md:w-1/2 lg:w-1/4 ">
              <div className="product item shadow-xl text-left p-4">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full  rounded-lg object-cover"
                    alt=""
                  />
                  <h3 className=" text-main pt-3  font-semibold text-xl">
                    {product.category.name}
                  </h3>
                  <h3 className="mp-1 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full ">
                    {product.title.split(" ").slice(0, 4).join(" ")}
                  </h3>
                  <div className="flex justify-between my-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-between items-center gap-5">
                  <button
                    onClick={() => {
                      addToCart(product.id);
                    }}
                    className="btn w-full"
                  >
                    {loading && currentId == product.id ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      isFavourite
                        ? deleteProductFromWishlist(product.id)(
                            toast.success(
                              "Product removed successfully from your wishlist"
                            )
                          )
                        : addProductToWishlist(product)(
                            toast.success(
                              "Product added successfully to your wishlist"
                            )
                          );
                    }}
                  >
                    <i
                      className={`fa-heart fa-2xl cursor-pointer ${
                        isFavourite ? "fas text-red-600" : "far text-red-600"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
