import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";




export default function CategoriesSlider() {
const [categories, setcategories] = useState([]);

 var settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 7,
   slidesToScroll: 3,
   autoplay: false,
   autoplaySpeed: 1000,
   responsive: [
     {
       breakpoint: 1200,
       settings: {
         slidesToShow: 7,
         slidesToScroll: 3,
       },
     },
     {
       breakpoint: 1024,
       settings: {
         slidesToShow: 5,
         slidesToScroll: 3,
       },
     },
     {
       breakpoint: 768,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 2,
       },
     },
     {
       breakpoint: 640,
       settings: {
         slidesToShow: 2,
         slidesToScroll: 1,
       },
     },
     {
       breakpoint: 480,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1,
       },
     },
   ],
 };


 

function getCategories(){
  axios
    .get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res) => {
     
      setcategories(res.data.data);
    })
    .catch((res) => {});
}
useEffect(()=>{
  getCategories()
},[])


  return (
    <>
      <h2 className="capitalize text-gray-500 font-semibold mt-10 mb-4 p-5 text-3xl text-left">
        Featured Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <>
            <div  className="text-gray-600 hover:text-main">
              <img
                src={category.image}
                className="s:w-full h-52 s:object-contain sm:object-cover mx-auto mb-4 "
                alt=""
              />
              <h4 className="text-lg mb-3 text-center">{category.name}</h4>
            </div>
          </>
        ))}
      </Slider>
    </>
  );
}
