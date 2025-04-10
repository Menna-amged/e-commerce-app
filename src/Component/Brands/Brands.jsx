import React, { useEffect, useRef, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { data, Link, useParams } from "react-router-dom";

export default function Brands() {
  const [brands, setbrands] = useState([]);
  const [brandDetails, setbrandDetails] = useState([]);
  const [selectedBrand, setselectedBrand] = useState(null);
  const [showModel, setshowModel] = useState(false);
  let { id } = useParams();

  function getAllBrands() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setbrands(res.data.data);
      })
      .catch((err) => err);
  }
  function getBrands(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        setbrandDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getAllBrands();
    getBrands(id);
  }, [id]);

  return (
    <>
      <h2 className="text-gray-500 text-left text-3xl px-5 pt-5 font-semibold">
        All Brands
      </h2>
      <div className="row ">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand.id} className="w-full md:w-1/2 lg:w-1/4 ">
              <div className="brand p-3 text-left cursor-pointer item text-main    text-gray-500 ">
                <img
                  onClick={() => {
                    setshowModel(true);
                    setselectedBrand(brand);
                  }}
                  src={brand.image}
                  className="w-full rounded-lg object-cover"
                  alt=""
                />
                <h3 className="py-5 font-semibold text-xl ">{brand.name}</h3>
              </div>
            </div>
          ))
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

      {showModel && (
        <div className="bg-black bg-opacity-50 fixed inset-0 flex items-center justify-center z-[999]">
          <div className="bg-white p-5 rounded-lg max-w-xl max-h-full shadow-lg ">
            <div class="flex items-center justify-between p-3 border-b rounded-t">
              <button
                onClick={() => {
                  setshowModel(false);
                }}
                class="hover:bg-gray-200 hover:text-gray-900 ms-auto inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg"
              >
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="flex items-center justify-between md:gap-12  space-y-5  ">
              <div className="pl-6 mt-10">
                <p className=" font-semibold  text-5xl p-2  s:text-2xl text-main  ">
                  {selectedBrand.name}
                </p>
                <h2 className="text-gray-500 px-5 font-semibold ">
                  {selectedBrand.name}
                </h2>
              </div>
              <div>
                <img
                  src={selectedBrand.image}
                  className="w-full object-cover mx-auto  rounded-lg "
                  alt=""
                />
              </div>
            </div>
            <div class="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
              <button
                onClick={() => {
                  setshowModel(false);
                }}
                type="button"
                class="btn "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
