import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext=createContext()


export default function WishlistContextProvider (props){


const [wishlist, setwishlist] = useState([]);
const [numOfWishlistItem, setnumOfWishlistItem] = useState(0)

let headers={
    token:localStorage.getItem('userToken')
}

 async function getLoggedUserWishlist(){

    try{
        const res=await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers})
    console.log(res.data);

        setwishlist(res.data.data)
         setnumOfWishlistItem(res.data.count);

        localStorage.setItem('wishlist',JSON.stringify(res.data.data))
       
          return res; 
        
    }
    catch (err){
         console.error("Error fetching wishlist:", err);
    }
 
    
   
}
async function addProductToWishlist(product){
    try{
        const res=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:product.id},{headers:headers})
        let updataList = [...wishlist, product];
        
        setwishlist(updataList)
       setnumOfWishlistItem(updataList.length); 
        
         
        
        localStorage.setItem('wishlist',JSON.stringify(updataList))
        
    }
     catch (err) {
      console.error("Error adding to wishlist:", err);
    } 
    
}
 async function deleteProductFromWishlist(productId) {
  try {
  const
    res = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: headers,
      }
    );
    console.log(res.data);

  let filteredProduct=wishlist.filter((item)=>item.id!==productId)
  setwishlist(filteredProduct)
 
  setnumOfWishlistItem(filteredProduct.length);
   localStorage.setItem("wishlist", JSON.stringify(filteredProduct));
    return res;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
  } 
   
 }

 function isInWishlist(productId) {
   return wishlist.some((item) => item.id === productId);
 }


useEffect(()=>{
    let storedWishlist = localStorage.getItem("wishlist")
    if(storedWishlist){
        setwishlist(JSON.parse(storedWishlist))
    }
    else{
    getLoggedUserWishlist();
    }
    
},[])

    return (
      <WishlistContext.Provider
        value={{
          wishlist,
          setwishlist,
          getLoggedUserWishlist,
          addProductToWishlist,
          deleteProductFromWishlist,
          isInWishlist,
          numOfWishlistItem,
          setnumOfWishlistItem,
        }}
      >
        {props.children}
      </WishlistContext.Provider>
    );
} 