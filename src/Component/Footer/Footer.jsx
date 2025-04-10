import React from 'react'
import style from "./Footer.module.css"
import { Link } from 'react-router-dom';
import amazon from"../../assets/images/amazon-pay.png"
import american from "../../assets/images/American-Express-Color.png"
import mastercard from "../../assets/images/mastercard.webp"
import paypal from "../../assets/images/paypal.png"
import visa from "../../assets/images/visa.svg"
import appleStore from "../../assets/images/get-apple-store.png"
import googlePlay from "../../assets/images/get-google-play.png"
export default function Footer() {
  return (
    <>
      <footer className="bg-neutral-200 pt-10  px-10  mt-10 text-left w-full  ">
        <div className="w-full">
          <h2 className="text-2xl">Get The FreshCart App</h2>
          <p className="text-gray-500 py-2">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className=" md:flex-row items-center justify-between gap-3 flex s:flex-col pt-4 pb-6">
            <input
              type="email"
              id="email"
              className="bg-gray-50 w-[85%] s:w-full border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block  p-2"
              placeholder="Email"
              required
            />

            <button className="btn s:w-full md:w-52 ">Share App Link</button>
          </div>
          <div className="border-y py-4 border-gray-300">
            <div className="lg:flex-row flex flex-col items-center justify-between">
              <div className="lg:mb-0 mb-3">
                <ul className="flex items-center justify-center">
                  <li className="mr-2 font-semibold">Payment Partners</li>
                  <li className="mr-2 ">
                    <Link to="">
                      <img src={amazon} alt="Amazon Pay" className="w-10" />
                    </Link>
                  </li>
                  <li className="mr-2 ">
                    <Link to="">
                      <img src={american} alt="American pay" className="w-10" />
                    </Link>
                  </li>
                  <li className="mr-2 ">
                    <Link to="">
                      <img
                        src={mastercard}
                        alt="MasterCard Pay"
                        className="w-10"
                      />
                    </Link>
                  </li>
                  <li className="mr-2 ">
                    <Link to="">
                      <img src={paypal} alt="paypal" className="w-10" />
                    </Link>
                  </li>
                  <li className="mr-2 ">
                    <Link to="">
                      <img src={visa} alt="visa" className="w-10" />
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="lg:mb-0 mb-3">
                <ul className="md:flex-row items-center justify-between gap-3 flex s:flex-col ">
                  <li className="mr-2  font-semibold">
                    Get deliveries with FreshCart
                  </li>
                  <div className="flex">
                    <li className="mr-2 ">
                      <Link to="">
                        <img
                          src={googlePlay}
                          alt="Google Play"
                          className="w-48"
                        />
                      </Link>
                    </li>
                    <li className="mr-2 ">
                      <Link to="">
                        <img
                          src={appleStore}
                          alt=" Apple Store"
                          className="w-44"
                        />
                      </Link>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:flex-row md:items-center flex flex-col font-medium items-start justify-between py-10">
            <div className="md:mb-0 mb-4">
              <span className=" text-sm text-gray-400">
                © 2022 <span> - 2024 </span>FreshCart e-Commerce HTML Template.
                All rights reserved.
              </span>
              <p className=" text-sm  text-gray-400">
                Powered by{" "}
                <Link to="https://codescandy.com/" className="text-main">
                  Codescandy
                </Link>
              </p>
            </div>
            <div>
              <ul className="flex items-center  text-sm text-gray-400">
                <li className="mr-2 text-sm font-medium">Follow us on</li>
                <li className="hover:text-main hover:border-main p-1 mr-2 transition-all duration-300 border border-gray-400 rounded-md cursor-pointer">
                  <i className="fab fa-facebook fa-xl"></i>
                </li>
                <li className="hover:text-main hover:border-main p-1 mr-2 transition-all duration-300 border border-gray-400 rounded-md cursor-pointer">
                  <i className="fab fa-twitter fa-xl"></i>
                </li>
                <li className="hover:text-main hover:border-main p-1 transition-all duration-300 border border-gray-400 rounded-md cursor-pointer">
                  <i className="fab fa-instagram fa-xl"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
