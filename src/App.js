import "./App.css";
import { useState, useEffect } from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../src/pages/Home/Home";
import About from "../src/pages/About/About";
import Contact from "../src/pages/Contact/Contact";
// import Product from "./pages/Products/Productcopy";
import Search from "./component/Product/Search.js";
// import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./pages/Products/Products";
import LoginSignup from "./component/User/LoginSignup";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import Payment from "./component/Cart/Payment";
// import AdminPage from "./Admin/Admin"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";

//Admin 
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
import OrderList from "./component/Admin/OrderList"
import ProcessOrder from "./component/Admin/ProcessOrder"
import UserList from "./component/Admin/UserList"
import UpdateUser from "./component/Admin/UpdateUser"
import ProductReviews from "./component/Admin/ProductReviews"



import ProtectedRoute from "./component/Route/ProtectedRoute";
// import Dashboard from "@mui/icons-material/Dashboard";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      {/* <BrowserRouter> */}
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<LoginSignup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        {/* <Route path="/admin" element={<AdminPage/>} /> */}
        <Route path="/password/reset/:token" element={<ResetPassword />} />
   </Routes>
   

      <ProtectedRoute path="/account" element={<Profile />} />
      <ProtectedRoute path="/shipping" element={<Shipping />} />
      <ProtectedRoute path="/me/update" element={<UpdateProfile />} />
      <ProtectedRoute path="/password/update" element={<UpdatePassword />} />
      <ProtectedRoute path="/orders" element={<MyOrders />} />
      <ProtectedRoute path="/success" element={<OrderSuccess />} />

      <ProtectedRoute path="/myorder/confirm" element={<ConfirmOrder />} />
      <ProtectedRoute path="/order/:id" element={<OrderDetails />} />

      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        element={<Dashboard />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/products"
        element={<ProductList />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product"
        element={<NewProduct />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product/:id"
        element={<UpdateProduct />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/orders"
        element={<OrderList />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/order/:id"
        element={<ProcessOrder />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/users"
        element={<UserList />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/user/:id"
        element={<UpdateUser />}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/reviews"
        element={<ProductReviews />}
      />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute path="/process/payment" element={<Payment />} />
        </Elements>
      )}

      <Footer />
      {/* </BrowserRouter> */}
    </>
  );
}
export default App;
