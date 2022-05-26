import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { PayProvider } from '../context/PayContext'
import ScrollToTop from './ScrollToTop';
import Footer2 from './Footer';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import TourList from '../pages/TourList';
import TourDetail from '../pages/TourDetail';
import Articals from '../pages/Articals';
import ArticalDetails from '../pages/ArticalDetails';
import Booking1 from '../pages/Booking1';
import Booking2 from '../pages/Booking2';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Page404 from '../pages/Page404'
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ChangePassword from '../pages/ChangePassword';
import LoginAdmin from '../pages/LoginAdmin';
import Admin from '../pages/Admin';
import AddArtical from '../pages/AddArtical';
import UpdateArtical from '../pages/UpdateArtical';
import TourDelete from '../pages/TourDelete'
import Booking3 from '../pages/Booking3'
export default function Body(props) {
    return (
        <PayProvider>
        <div className="boxed_wrapper">
            <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route exact path="/tour-list" element={<TourList/>} />
                        <Route exact path="/tour-detail/:tourId" element={<TourDetail/>} />
                        <Route exact path="/articals" element={<Articals/>} />
                        <Route exact path="/artical-details/:articalId" element={<ArticalDetails/>} />
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
                        <Route  path="/articals/:articalId/update" element={<UpdateArtical/>} />
                        <Route  path="/deleteTour" element={<TourDelete/>} />
                    </Routes>
                    <ScrollToTop />
                    <Footer2 />
            </BrowserRouter>
        </div>
    </PayProvider>
       
    )
}