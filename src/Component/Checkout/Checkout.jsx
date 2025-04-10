import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Checkout() {
  let { checkout, cartId, clearProducts, setnumOfCartItem } =
    useContext(CartContext);
  let navigate = useNavigate();

  async function handlecheckout(cartId, url) {
    if (formik.values.paymentMethod === "cash") {
      try {
        let { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          {
            shippingAddress: {
              details: formik.values.details,
              phone: formik.values.phone,
              city: formik.values.city,
            },
          },
          {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          }
        );

        if (data.status === "success") {
          await clearProducts();
          setnumOfCartItem(0);
          navigate("/allorders");
        }
      } catch (error) {
        console.log("Cash order error:", error);
      }
    } else {
      let { data } = await checkout(cartId, url, formik.values);
      window.location.href = data.session.url;
    }
  }

  let formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
      paymentMethod: "",
    },
    onSubmit: () => handlecheckout(cartId, `http://localhost:5173`),
  });

  return (
    <>
      <h2 className="text-gray-500 text-3xl capitalize my-4 text-left font-semibold">
        Checkout
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className=" font-medium" htmlFor="phone">
              Phone
            </label>
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Phone Number..."
            className="h-[45px] w-full rounded-lg focus:ring-main focus:border-main px-4  font-medium py-2"
            required
          />
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className=" font-medium" htmlFor="city">
              City
            </label>
          </div>
          <input
            name="city"
            type="text"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Write Your City"
            className="h-[45px] w-full rounded-lg focus:ring-main focus:border-main px-4  font-medium py-2"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className=" font-medium" htmlFor="address">
              Details
            </label>
          </div>
          <div className="flex">
            <textarea
              required
              name="details"
              id="address"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write Your Address Here..."
              cols="30"
              rows="3"
              maxLength="200"
              className="w-full px-4 py-2 font-medium  focus:ring-main focus:border-main rounded-lg"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center mb-4">
            <input
              id="cash"
              type="radio"
              name="paymentMethod"
              value="cash"
              onChange={formik.handleChange}
              checked={formik.values.paymentMethod === "cash"}
              className="w-5 h-5"
            />
            <label htmlFor="cash" className="ms-2 text-lg font-bold text-main">
              Cash Payment
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="online"
              type="radio"
              name="paymentMethod"
              value="online"
              onChange={formik.handleChange}
              checked={formik.values.paymentMethod === "online"}
              className="w-5 h-5"
            />
            <label
              htmlFor="online"
              className="ms-2 text-lg font-bold text-main"
            >
              Online Payment
            </label>
          </div>
          <button
            type="submit"
            disabled={!formik.values.paymentMethod}
            className="hover:bg-main-hover focus:ring-main-300 disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-main rounded-lg cursor-pointer"
          >
            Continue with {formik.values.paymentMethod || ""}
          </button>
        </div>
      </form>
    </>
  );
}
