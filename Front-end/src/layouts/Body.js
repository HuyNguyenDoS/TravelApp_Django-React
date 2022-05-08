import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Header from '../layouts/Header';
import IndexHeader from '../layouts/IndexHeader';
import Home from '../pages/Home';
import IndexNavbar from '../layouts/IndexNavbar';
import Footer from '../layouts/Footer';
import Tour from '../pages/Tour';
import TourDetail from '../pages/TourDetail';
import ArticalDetail from '../pages/ArticalDetail';
import LoginAdmin from '../pages/LoginAdmin';
import Admin from '../pages/Admin';

export default function Body() {
    return (
            <BrowserRouter>
                
                <Routes>
                    <Route path ='/' element ={<Home />} /> 
                    <Route  path ='/login' element ={<Login />} />
                    <Route  path ='/loginAdmin' element ={<LoginAdmin />} />
                    <Route  path ='/admin' element ={<Admin />} />
                    <Route  path ='/tours/:tourId/' element ={<TourDetail />} />
                    <Route  path ='/articals/:articalId/' element ={<ArticalDetail />} />
                    <Route  path ='/register' element ={<Register />} />
                </Routes> 
                <Footer />
            </BrowserRouter>
       
    )
}