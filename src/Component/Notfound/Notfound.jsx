import React from 'react'
import style from "./Notfound.module.css"
import error from "../../assets/images/error.svg"
import logo from "../../assets/images/freshcart-logo.svg"
import { Link } from 'react-router-dom'
export default function Notfound() {
  return (
    <>
      <div className="container lg:px-20 px-10 mx-auto">
        <div className="flex flex-col lg:gap-5 justify-center w-full py-10 gap-10">
          <div>
            <Link to='/'>
              <img src={logo} alt=" freshcart logo" />
            </Link>
          </div>
          <div className="lg:flex-row items-center text-left justify-between lg:gap-12 s:gap-5 flex s:flex-col ">
            <div>
              <h1 className="mb-4 text-4xl font-semibold">
                Something’s wrong here…
              </h1>
              <p className="mt-2 mb-8 text-sm font-medium text-gray-500">
                We can’t find the page you’re looking for. Check out our help
                center or head back to home.
              </p>
              <div className="flex items-center gap-3">
                <button className="text-white bg-gray-800 rounded-lg  my-2 hover:bg-gray-700  py-2 px-4 font-semibold text-lg ">
                  Help Center
                </button>
                <button className="btn">
                  <Link to="/"> Back to Home</Link>
                </button>
              </div>
            </div>
            <div>
              <Link>
                <img src={error} alt=" error logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
