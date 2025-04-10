import React, { useState, useContext } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

import register from "../../assets/images/register.svg";

export default function Register() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  function handleRegister(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setisLoading(false);
        // console.log(res);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setisLoading(false);
        setApiError(res.response.data.message);
      });
  }

  let myValidation = yup.object().shape({
    name: yup
      .string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    email: yup.string().email("not vaild email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "min length is 6"),
    rePassword: yup
      .string()
      .required("rePassword is required")
      .min(6, "min length is 6")
      .oneOf([yup.ref("password")], "not matched with password"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[1025][0-9]{8}$/, "phone not vaild"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: myValidation,
    // validate:myValidation
    onSubmit: handleRegister,
  });
  return (
    <>
      <div className="container mx-auto py-8 px-10 my-10">
        <div className="lg:flex-row items-center justify-between lg:gap-12 s:gap-10 flex s:flex-col-reverse ">
          <div>
            <img src={register} className="w-full" alt="" />
          </div>
          <div className="py-5">
            <h2 className="font-bold text-gray-700 text-2xl py-2">
              Get Start Shopping
            </h2>
            <p className="pb-6">
              Welcome to FreshCart! Enter your email to get started.
            </p>
            {ApiError ? (
              <div className="bg-red-700 text-white p-2 my-5 mx-auto w-1/2  font-bold rounded-lg">
                {ApiError}
              </div>
            ) : null}
            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 
            bg-transparent border-0 border-b-2 border-gray-300 appearance-none  
             dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium left-0 absolute text-sm
             text-gray-500  duration-300 transform -translate-y-6 
             scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
             rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto
              peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500
               peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
               peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your Name
                </label>
                {formik.errors.name && formik.touched.name ? (
                  <div
                    className="p-4 text-red-800 mb-4 text-sm  rounded-lg"
                    role="alert"
                  >
                    <span className="font-medium">{formik.errors.name}</span>
                  </div>
                ) : null}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your Email
                </label>
                {formik.errors.email && formik.touched.email ? (
                  <div
                    className="p-4 text-red-800 mb-4 text-sm  rounded-lg"
                    role="alert"
                  >
                    <span className="font-medium">{formik.errors.email}</span>
                  </div>
                ) : null}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your password
                </label>
                {formik.errors.password && formik.touched.password ? (
                  <div
                    className="p-4 text-red-800 mb-4 text-sm  rounded-lg"
                    role="alert"
                  >
                    <span className="font-medium">
                      {formik.errors.password}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="rePassword"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="rePassword"
                  className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your rePassword
                </label>
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div
                    className="p-4 text-red-800 mb-4 text-sm  rounded-lg"
                    role="alert"
                  >
                    <span className="font-medium">
                      {formik.errors.rePassword}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter Your Phone
                </label>
                {formik.errors.phone && formik.touched.phone ? (
                  <div
                    className="p-4 text-red-800 mb-4 text-sm  rounded-lg"
                    role="alert"
                  >
                    <span className="font-medium">{formik.errors.phone}</span>
                  </div>
                ) : null}
              </div>

              <div className="">
                <button type="submit" className="btn w-full">
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Register"
                  )}
                </button>

                <span className="capitalize font-semibold">
                  Do you have an account ?{" "}
                  <Link className="text-main " to="/login">
                    Login Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
