import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function Wishlist() {
  let {
    wishlist,
    setwishlist,
    getLoggedUserWishlist,
    deleteProductFromWishlist,
    numOfWishlistItem,
    setnumOfWishlistItem,
  } = useContext(WishlistContext);

  let { addProductToCart, setnumOfCartItem } = useContext(CartContext);
  console.log(wishlist);

  async function addToCart(id) {
    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      toast.success(response.data.message);
      setnumOfCartItem(response.data.numOfCartItems);
    } else {
      toast.error(response.data.message);
    }
  }

  async function getWishlist() {
    let response = await getLoggedUserWishlist();
    if (response && response.data.status === "success") {
      setwishlist(response.data.data);
      setnumOfWishlistItem(response.data.count);
    }
  }

  async function deleteFromWishlist(id) {
    let response = await deleteProductFromWishlist(id);

    if (response?.data?.status === "success") {
      setnumOfWishlistItem(response.data.count);
      // setwishlist(response.data.data);
      toast.success("Removed from wishlist ");
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between px-5 pt-8  ">
        <h2 className="text-gray-500 text-3xl capitalize  text-left font-semibold">
          Wishlist
        </h2>
        <h2 className="text-gray-500 text-xl capitalize text-center font-semibold">
          <span className="text-main"> {numOfWishlistItem}</span> Items
        </h2>
      </div>

      {wishlist?.length > 0 ? (
        <>
          {wishlist.map((product) => (
            <>
              <div
                key={product.id}
                className="rounded-xl shadow-xl my-4 p-4 w-full  "
              >
                <div className="  sm:flex-row items-center justify-between gap-3 flex s:flex-col  ">
                  <div className="flex items-center gap-3 text-left">
                    <div>
                      <img src={product.imageCover} className="w-28" alt="" />
                    </div>
                    <div className="text-xl">
                      <h3 className="mb-3 font-semibold text-gray-500 ">
                        {" "}
                        {product.title.split(" ").slice(0, 4).join(" ")}
                      </h3>
                      <h4 className="text-main mb-2 font-bold ">
                        {product.price} EPG
                      </h4>
                      <button
                        onClick={() => deleteFromWishlist(product.id)}
                        className="text-red-600 "
                      >
                        <i className="fas fa-trash p-2"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="s:w-full sm:w-auto">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="btn capitalize w-full  "
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        <div className="p-10">
          <h2 className=" text-3xl font-bold mt-20 p-5 uppercase text-center">
            your wishlist is empty
          </h2>
        </div>
      )}
    </>
  );
}
