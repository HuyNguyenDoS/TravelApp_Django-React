import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { PayProvider } from '../context/PayContext'
import ScrollToTop from './ScrollToTop';
import Header from './Header';
import Footer from './Footer';
import Footer2 from './Footer2';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import TourList from '../pages/TourList';
import TourDetail from '../pages/TourDetail';
import Blogs from '../pages/Blogs';
import BlogDetails from '../pages/BlogDetails';
import Booking1 from '../pages/Booking1';
import Booking2 from '../pages/Booking2';
import Booking3 from '../pages/Booking3';
import About from '../pages/About';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Page404 from '../pages/Page404'
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ChangePassword from '../pages/ChangePassword';
import ArticalDetail from '../pages/ArticalDetail';
import LoginAdmin from '../pages/admin/LoginAdmin';
import Admin from '../pages/admin/Admin';
import AddArtical from '../pages/admin/AddArtical';
import UpdateArtical from '../pages/admin/UpdateArtical';

export default function Body(props) {
    return (
        <PayProvider>
        <div className="boxed_wrapper">
            <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path="/tour-list" element={<TourList/>} />
                        <Route exact path="/tour-detail/:tourId" element={<TourDetail/>} />
                        <Route exact path="/tour-detail/:tourId/gallery" element={<Gallery/>} />
                        <Route exact path="/articals" element={<Blogs/>} />
                        <Route exact path="/artical-details/:articalId" element={<BlogDetails/>} />
                        <Route exact path="/tour-detail/:tourId/booking-1" element={<Booking1/>} />
                        <Route exact path="/tour-detail/:tourId/booking-2" element={<Booking2/>} />
                        <Route exact path="/tour-detail/:tourId/booking-3/:invId/:payType/confirm" element={<Booking3/>} />
                        <Route exact path="/contact" element={<Contact/>} />
                        <Route exact path="/about-us" element={<About/>} />
                        <Route exact path="/login" element={<Login/>} />
                        <Route exact path="/register" element={<Register/>} />
                        <Route exact path="/change-password" element={<ChangePassword/>} />
                        <Route exact path="/forgot-password" element={<ForgotPassword/>} />
                        <Route exact path="/reset-password/:token" element={<ResetPassword/>} />
                        <Route path="*" element={<Page404/>} />
                        
                        <Route  path ='/loginAdmin' element ={<LoginAdmin />} />
                        <Route  path ='/admin' element ={<Admin />} />
                        <Route  path="/addArtical" element={<AddArtical/>} />
                        <Route  path ='/articals/:articalId/' element ={<ArticalDetail/>} />
                        <Route  path="/articals/:articalId/update" element={<UpdateArtical/>} />
                    </Routes>
                    <ScrollToTop />
                    <Footer2 />
            </BrowserRouter>
        </div>
    </PayProvider>
       
    )
}