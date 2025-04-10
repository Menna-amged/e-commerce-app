import React from 'react'
import style from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import background from "../../assets/images/light-patten.svg";
export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen  p-0  justify-between">
        <Navbar />

        <div className="container  my-5  mx-auto py-20 lg:py-11">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}
