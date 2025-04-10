
import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg";
import slide2 from "../../assets/images/slider-image-2.jpeg";
import slide3 from "../../assets/images/slider-image-3.jpeg";
import slide5 from "../../assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12  items-stretch">
        {/* Left Slider */}
        <div className="md:col-span-9">
          <Slider {...settings}>
            <img
              src={slide1}
              className="w-full aspect-[4/2] md:h-[430px] s:h-[215px]  object-fill"
              alt="Slide 1"
            />
            <img
              src={slide3}
              className="w-full aspect-[4/2] md:h-[430px] s:h-[215px]  object-fill"
              alt="Slide 3"
            />
            <img
              src={slide5}
              className="w-full aspect-[4/2] md:h-[430px] s:h-[215px]  object-fill"
              alt="Slide 5"
            />
          </Slider>
        </div>

        {/* Right Static Images */}
        <div className="md:col-span-3 flex flex-col  ">
          <img
            src={slide2}
            className="w-full aspect-[4/2] h-[215px] object-fill"
            alt="Static 1"
          />
          <img
            src={slide3}
            className="w-full aspect-[4/2] h-[215px] object-fill"
            alt="Static 2"
          />
        </div>
      </div>
    </div>
  );
}
