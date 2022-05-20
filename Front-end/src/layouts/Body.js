import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import TourDetail from '../pages/TourDetail';
import ArticalDetail from '../pages/ArticalDetail';
import LoginAdmin from '../pages/LoginAdmin';
import Admin from '../pages/Admin';
import UpdateArtical from '../pages/UpdateArtical';
import AddArtical from '../pages/AddArtical';

export default function Body() {
    return (
            <BrowserRouter>
                
                <Routes>
                    <Route path ='/' element ={<Home />} /> 
                    <Route  path ='/login' element ={<Login />} />
                    <Route  path ='/loginAdmin' element ={<LoginAdmin />} />
                    <Route  path ='/admin' element ={<Admin />} />
                    <Route  path ='/tours/:tourId/' element ={<TourDetail />} />
                    <Route  path ='/tours/:tourId/bookticket' element ={<TourDetail />} />
                    <Route  path ='/articals/:articalId/' element ={<ArticalDetail />} />
                    <Route  path ='/register' element ={<Register />} />
                    <Route  path="/addArtical" element={<AddArtical/>} />
                    <Route  path="/articals/:articalId/update" element={<UpdateArtical/>} />
                </Routes> 

            </BrowserRouter>
       
    )
}