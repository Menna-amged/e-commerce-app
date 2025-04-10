import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let {
    wishlist,
    setwishlist,
    getLoggedUserWishlist,
    addProductToWishlist,
    deleteProductFromWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  let { addProductToCart, numOfCartItem, setnumOfCartItem } =
    useContext(CartContext);
  const [product, setproduct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  let { id, category } = useParams();
  const [isFavourite, setIsFavourite] = useState(false);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        console.log(res.data.data);

        setproduct(res.data.data);
        setIsFavourite(isInWishlist(data.data.id));
      })
      .catch((res) => {});
  }
  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProducts(related);
        setnumOfCartItem(response.data.numOfCartItems);
      })
      .catch((res) => {});
  }

  async function addToCart(id) {
    let response = await addProductToCart(id);
    setnumOfCartItem(response.data.numOfCartItems);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }
  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);
  function toggleWishlist() {
    if (isFavourite) {
      deleteProductFromWishlist(product.id);
      toast.success("Product removed from wishlist");
    } else {
      addProductToWishlist(product);
      toast.success("Product added to wishlist");
    }
    setIsFavourite(!isFavourite);
  }
  return (
    <>
      <div className="lg:flex-row items-center justify-between lg:gap-12 s:gap-5 flex s:flex-col  ">
        <div className="lg:w-1/4 s:w-full">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img src={src} className="w-full"></img>
            ))}
          </Slider>
        </div>
        <div className="w-3/4  text-left ">
          <h3 className="font-semibold text-xl capitalize ">
            {product?.title}
          </h3>
          <h4 className=" my-4 font-medium">{product?.description}</h4>
          <h4 className="text-main text-lg font-medium">
            {product?.category.name}
          </h4>
          <div className="flex justify-between  my-5">
            <span>{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400"></i>{" "}
              {product?.ratingsAverage}
            </span>
            <button onClick={toggleWishlist}>
              <i
                className={`fa-heart fa-2xl cursor-pointer ${
                  isFavourite ? "fas text-red-600" : "far text-red-600"
                }`}
              />
            </button>
          </div>
          <button onClick={() => addToCart(product.id)} className="btn w-full">
            Add To Cart
          </button>
        </div>
      </div>
      <h2 className="capitalize text-gray-500 font-semibold mt-10  text-3xl text-left">
        Recent Products
      </h2>
      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => {
            let isFavourite = isInWishlist(product.id);

            return (
              <div key={product.id} className="w-full md:w-1/2 lg:w-1/4">
                <div className="product item px-3  my-2 text-left">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img src={product.imageCover} className="w-full" alt="" />
                    <h3 className=" text-main pt-3 font-semibold">
                      {product.category.name}
                    </h3>
                    <h3 className=" font-semibold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex justify-between pt-3 ">
                      <span>{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star text-yellow-400"></i>{" "}
                        {product.ratingsAverage}
                      </span>
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
                            isFavourite
                              ? "fas text-red-600"
                              : "far text-red-600"
                          }`}
                        />
                      </button>
                    </div>
                  </Link>

                  <button
                    onClick={() => addToCart(product.id)}
                    className="btn w-full"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        )}
      </div>
    </>
  );
}
