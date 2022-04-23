import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Header from '../layouts/Header';
import IndexHeader from '../layouts/IndexHeader';
import Home from '../pages/Home';
import IndexNavbar from '../layouts/IndexNavbar';
import Footer from '../layouts/Footer';

export default function Body() {
    return (
            <BrowserRouter>
                  <IndexNavbar/>
                {/* <Header/> */}
                <Routes>
                    <Route path ='/' element ={<Home />} /> 
                    <Route  path ='/login' element ={<Login />} />
                    <Route  path ='/register' element ={<Register />} />
                </Routes> 
                <Footer />
            </BrowserRouter>
       
    )
}