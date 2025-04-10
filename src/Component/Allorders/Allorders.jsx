import React, { useEffect, useState } from 'react'
import style from "./Allorders.module.css"
import{jwtDecode} from 'jwt-decode'
import axios from 'axios'

export default function Allorders() {
const [orders, setorders] = useState([])

async function getAllorders() {
  let {id}=jwtDecode(localStorage.getItem('userToken'))
  console.log(id);
try{
  let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  console.log(data);
  setorders(data)
  
}
catch(error){
console.log(error);

}

  
}
useEffect(()=>{
  getAllorders()
},[])



  return (
    <>
      <h2 className="text-gray-500 text-3xl capitalize my-4 text-left font-semibold">
        My Orders
      </h2>

      {orders.map((order) => (
        <>
          <div
            key={order.id}
            className="md:flex-row flex flex-col  justify-between  gap-8 rounded-xl shadow-xl  my-4 p-5  w-full "
          >
            <div className="cartItem">
              {order.cartItems.map((item) => (
                <>
                  <div
                    key={item._id}
                    className="flex items-center  gap-5 text-left "
                  >
                    <div className="flex items-center gap-5 ">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-24 my-2 rounded "
                      />
                    </div>

                    <div className="flex-col items-center gap-3">
                      <h3 className=" font-semibold text-gray-500 ">
                        {item.product.title.split(" ").slice(0, 4).join(" ")}
                      </h3>
                      <h4 className="text-main  font-bold ">
                        {item.price} EPG
                      </h4>
                      <h4>
                        {" "}
                        Qty:{" "}
                        <span className="text-main  font-bold ">
                          {item.count}
                        </span>
                      </h4>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className="orderDetails">
              <h2 className="text-3xl text-gray-900 font-semibold  border-b-2 w-52 border-main mb-2">
                Order Details
              </h2>
              <div className="flex gab-5 mb-2">
                <h4 className="font-semibold text-gray-700 text-lg">
                  Order ID:{" "}
                  <span className="text-main  font-bold "> {order.id}</span>
                </h4>
              </div>
              <div className="flex gab-5 mb-2">
                <h4 className="font-semibold text-gray-700 text-lg">
                  Payment Method:
                  <span className="text-main  font-bold ">
                    {" "}
                    {order.paymentMethodType}
                  </span>
                </h4>
              </div>
              <div className="flex gab-5 mb-2">
                <h4 className="font-semibold text-gray-700 text-lg">
                  Address:{" "}
                  <span className="text-main  font-bold ">
                    {" "}
                    {order.shippingAddress.city}
                  </span>
                </h4>
              </div>
              <div className="flex gab-5 mb-2">
                <h4 className="font-semibold text-gray-700 text-lg">
                  Phone Number:{" "}
                  <span className="text-main  font-bold ">
                    {" "}
                    {order.shippingAddress.phone}
                  </span>
                </h4>
              </div>
              <div className="flex gab-5 mb-2">
                <h4 className="font-semibold text-gray-700 text-lg">
                  Total Order Price:{" "}
                  <span className="text-main  font-bold ">
                    {" "}
                    {order.totalOrderPrice}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}
