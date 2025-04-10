import React, { useEffect, useRef, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { data, Link, useParams } from "react-router-dom";

export default function Categories() {
  const [categories, setcategories] = useState([]);
  const [categoryDetails, setcategoryDetails] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [showModel, setshowModel] = useState(false);
  let { id } = useParams();

  function getAllCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
      })
      .catch((err) => err);
  }
  function getCategories(id) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        setcategoryDetails(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getAllCategories();
    getCategories(id);
  }, [id]);

  return (
    <>
      <h2 className="text-gray-500 text-left text-3xl px-5 pt-5  font-semibold">
        Featured Categories
      </h2>
      <div className="row ">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="w-full md:w-1/2 lg:w-1/4">
              <div className="category cursor-pointer item hover:text-main  text-gray-500 ">
                <img
                  onClick={() => {
                    setshowModel(true);
                    setselectedCategory(category);
                  }}
                  src={category.image}
                  className="w-full h-[300px] rounded-lg object-cover"
                  alt=""
                />
                <h3 className="py-5 font-semibold text-center text-xl ">
                  {category.name}
                </h3>
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
            <div className="flex items-center justify-between md:gap-12  pb-4 space-y-4   ">
              <div className="pl-2 mt-10">
                <p className=" font-semibold  md:text-5xl p-2 s:text-2xl  text-main  ">
                  {selectedCategory.name}
                </p>
                <h2 className="text-gray-500 px-5 font-semibold ">
                  {selectedCategory.name}
                </h2>
              </div>
              <div className="s:w-full ">
                <img
                  src={selectedCategory.image}
                  className="w-full object-cover mx-auto h-[300px] rounded-lg "
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
