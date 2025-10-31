import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Footer from "./components/Layouts/Footer";
import Header from "./components/Layouts/Header";

import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import Profile from "./components/Auth/Profile"

import Home from "./components/Home"
import AboutShop from "./components/AboutShop"

import Form from "./components/Ui/Form"
import AllProductByWomen from "./components/Products/AllProductByWomen"
import AllProductByMen from "./components/Products/AllProductByMen"
import BagProduct from "./components/Products/BagProduct"
import HatProduct from "./components/Products/HatProduct"
import MaskProduct from "./components/Products/MaskProduct"

import ProductManage from "./components/Staff/ManageProduct"
import OrderManage from "./components/Staff/ManageOrder"
import Statistics from "./components/Staff/Statistic"


import Cart from "./components/Cart"
import WishList from "./components/WishList"
import ProductDetails from "./components/Products/ProductDetails"

import Orders from "./components/Orders/Orders"

import { MyDispatchContext, MyUserContext } from "./configs/MyContexts";
import { authApis, endpoints } from "./configs/APIs";
import cookie from "react-cookies";
import { useEffect } from "react";
import { useReducer } from "react";
import MyUserReducer from "./reducer/MyUserReducer";

import AgentXChat from "./components/AI/AgentXChat";


function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  useEffect(() => {
    const loadUser = async () => {
      const token = cookie.load("token");
      if (token !== undefined) {
        try {
          const res = await authApis().get(endpoints['my-profile']);
          console.log("Thông tin user từ token", res.data.result);
          dispatch({ type: "login", payload: res.data.result });
        } catch (err) {
          console.error("Không thể lấy thông tin user từ token", err);
          cookie.remove("token");
          dispatch({ type: "logout" });
        }
      }
    };
    loadUser();
  }, []);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pages/he-thong-cua-hang-v-sixtyfour" element= {<AboutShop/>} />

            <Route path="/account/register" element ={<Register />} />
            <Route path="/account/login" element ={<Login />} />
            <Route path="/account" element = {<Profile />} />

            <Route path="/form" element= {<Form />} />
            <Route path="/tat-ca-san-pham-nu" element= {<AllProductByWomen/>} />
            <Route path="/tat-ca-san-pham-nam" element= {<AllProductByMen />} />
            <Route path="/collections/tui-denim" element= {<BagProduct />} />
            <Route path="/collections/non-jeans" element= {<HatProduct />} />
            <Route path="/collections/khau-trang" element= {<MaskProduct />} />

            <Route path="/checkouts/:id" element = {<Orders />} />

            <Route path="/cart" element= {<Cart />} />
            <Route path="/wishlist" element= {<WishList/>} />

            <Route path="/product-details/:id" element = {<ProductDetails />} />


            <Route path="/product/manage" element = {<ProductManage />} />
            <Route path="/product/orders" element = {<OrderManage />} />
            <Route path="/product/statistics" element = {<Statistics />} />
          </Routes>
          {user?.roles?.some(role => role.name === "USER") && <AgentXChat />}
          <AgentXChat />
        </BrowserRouter>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider >
  );
}

export default App;
