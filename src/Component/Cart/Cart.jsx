import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteProduct,
    numOfCartItem,
    setnumOfCartItem,
    clearProducts,
  } = useContext(CartContext);

  const [cartDetails, setcartDetails] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  async function getCartItem() {
    setisLoading(true);
    let response = await getLoggedUserCart();
    console.log(response.data);
    if (response.data.status === "success") {
      setcartDetails(response.data.data);
      setnumOfCartItem(response.data.numOfCartItems);
      localStorage.setItem("numOfCartItem", response.data.numOfCartItems);
    }
    setisLoading(false);
  }

  async function updateProduct(id, count) {
    if (count == 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      console.log(response.data.data);
      setnumOfCartItem(response.data.numOfCartItems);
      localStorage.setItem("numOfCartItem", response.data.numOfCartItems);
      if (response.data.status == "success") {
        setcartDetails(response.data.data);
        toast.success("Product updated Successfully");
      } else {
        toast.error("Error");
      }
    }
  }
  async function deleteItem(productId) {
    let response = await deleteProduct(productId);
    setnumOfCartItem(response.data.numOfCartItems);
    localStorage.setItem("numOfCartItem", response.data.numOfCartItems);

    if (response.data.status == "success") {
      setcartDetails(response.data.data);
    }
  }
  async function clearItems() {
    let response = await clearProducts();
    setcartDetails(null);
    setnumOfCartItem(0);
    localStorage.removeItem("numOfCartItem");
  }

  useEffect(() => {
    const savedCartCount = localStorage.getItem("numOfCartItem");
    if (savedCartCount) {
      setnumOfCartItem(parseInt(savedCartCount, 10));
    } else {
      setnumOfCartItem(0);
    }

    getCartItem();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      ) : cartDetails?.products.length > 0 ? (
        <>
          <div className="flex justify-between sm:gap-11 items-center s:gap-5 pt-8 pb-4">
            <h2 className="text-gray-500 text-3xl capitalize text-left font-semibold">
              shopping cart
            </h2>
            <button
              onClick={clearItems}
              className=" text-white bg-red-500 rounded-lg  my-3 hover:bg-red-700  py-1 px-5 font-semibold     "
            >
              Clear All
            </button>
          </div>

          <div className="flex sm:flex-row s:flex-col s:gap-3 sm:justify-between sm:gap-11 items-center pb-5">
            <h2 className="text-gray-500 text-xl capitalize  text-center ">
              total price:{" "}
              <span className="text-main">
                {" "}
                {cartDetails?.totalCartPrice} EGP
              </span>
            </h2>
            <h2 className="text-gray-500 text-xl capitalize  text-center ">
              total Number: <span className="text-main"> {numOfCartItem}</span>
            </h2>
          </div>
          {cartDetails?.products.map((product) => (
            <>
              <div
                key={product.product.id}
                className="rounded-xl shadow-xl my-4 p-4 w-full  "
              >
                <div className="  sm:flex-row items-center justify-between gap-3 flex s:flex-col  ">
                  <div className="flex items-center gap-3 text-left">
                    <div>
                      <img
                        src={product.product.imageCover}
                        className="w-28"
                        alt=""
                      />
                    </div>
                    <div className="text-xl">
                      <h3 className="mb-3 font-semibold text-gray-500 ">
                        {" "}
                        {product.product.title.split(" ").slice(0, 4).join(" ")}
                      </h3>
                      <h4 className="text-main mb-2 font-bold ">
                        {product.price} EPG
                      </h4>
                      <button
                        onClick={() => deleteItem(product.product.id)}
                        className="text-red-600 "
                      >
                        <i className="fas fa-trash p-2"></i>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        updateProduct(product.product.id, product.count + 1)
                      }
                      className="text-gray-600 border-main border-2 rounded-lg hover:bg-main hover:text-white py-1 px-2.5 w-full cursor-pointer "
                    >
                      +
                    </button>
                    <span>{product.count}</span>
                    <button
                      onClick={() =>
                        updateProduct(product.product.id, product.count - 1)
                      }
                      className="text-gray-600 border-main border-2 rounded-lg hover:bg-main hover:text-white py-1 px-2.5 w-full cursor-pointer "
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}

          <Link to={"/checkout"}>
            <button className="btn w-full">Checkout</button>
          </Link>
        </>
      ) : (
        <div className="p-10 flex flex-col items-center">
          <h2 className=" text-3xl font-bold mt-20 p-5 uppercase text-center">
            your cart is empty
          </h2>
          <p className="text-gray-600 capitalize text-center  pb-5">
            you have on items in your cart at the moment
          </p>
          <Link
            to={"/products"}
            className="btn px-7 py-2  capitalize font-semibold text-lg"
          >
            start shopping
          </Link>
        </div>
      )}
    </>
  );
}
