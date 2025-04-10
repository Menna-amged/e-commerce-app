import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext=createContext()

export default function CartContextProvider(props){
let  headers={token:localStorage.getItem("userToken")}

const [numOfCartItem, setnumOfCartItem] = useState(0)
const [cartId, setcartId] = useState(0)

function addProductToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId: productId},{
        headers,
      },
       
    
    )
    .then((res)=>res)
    .catch((err)=>err)

}

function getLoggedUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((res)=>

     {
      //  console.log(res.data);
       setcartId(res.data.data._id);
       setnumOfCartItem(res.data.numOfCartItems)
       return res;
     }
  )

    .catch((err)=>err)
}
function updateCartProductQuantity(productId,newCount){
    return axios
      .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount}, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
}
function deleteProduct(productId){
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
}
function clearProducts(){
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
}
function checkout(cartId,url,formData){
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        {
          shippingAddress:formData
        },{headers}
      )
      .then((res) => res)
      .catch((err) => err);
}
useEffect(()=>{
  getLoggedUserCart()
},[])

    return (
      <CartContext.Provider
        value={{
          addProductToCart,
          getLoggedUserCart,
          updateCartProductQuantity,
          deleteProduct,
          clearProducts,
          numOfCartItem,
          setnumOfCartItem,
          checkout,
          cartId,
          setcartId,
        }}
      >
        {props.children}
      </CartContext.Provider>
    );
}