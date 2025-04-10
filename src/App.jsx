import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Component/Home/Home";
import Products from "./Component/Products/Products";
import Cart from "./Component/Cart/Cart";
import Categories from "./Component/Categories/Categories";
import Login from "./Component/Login/Login";
import Notfound from "./Component/Notfound/Notfound";
import Register from "./Component/Register/Register";
import Brands from "./Component/Brands/Brands";
import { Flowbite } from "flowbite-react";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import background from "./assets/images/light-patten.svg";
import Wishlist from "./Component/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import Checkout from "./Component/Checkout/Checkout";
import Allorders from "./Component/Allorders/Allorders";

let query = new QueryClient();

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <CounterContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={x}></RouterProvider>

              <Toaster />
            </WishlistContextProvider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </CounterContextProvider>
    </UserContextProvider>
  );
}

export default App;
