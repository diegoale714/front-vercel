import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";
import EditProductPage from "./pages/EditProductPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";

function App() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io("https://urbn-2.onrender.com");
        socket.off("notification").on("notification", (msgObj, user_id) => {
            // logic for notification
            if (user_id === user._id) {
                dispatch(addNotification(msgObj));
            }
        });

        socket.off("new-order").on("new-order", (msgObj) => {
            if (user.isAdmin) {
                dispatch(addNotification(msgObj));
            }
        });
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    {!user && (
                        <>
                            <Route exact path="/login" element={<Login />} />
                            <Route  exact path="/signup" element={<Signup />} />
                        </>
                    )}

                    {user && (
                        <>
                            <Route exact path="/cart" element={<CartPage />} />
                            <Route exact path="/orders" element={<OrdersPage />} />
                        </>
                    )}
                    {user && user.isAdmin && (
                        <>
                            <Route exact path="/admin" element={<AdminDashboard />} />
                            <Route exact path="/product/:id/edit" element={<EditProductPage />} />
                        </>
                    )}
                    <Route exact path="/product/:id" element={<ProductPage />} />
                    <Route exact path="/category/:category" element={<CategoryPage />} />

                    <Route exact path="/new-product" element={<NewProduct />} />

                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;