import React from "react";
import { useState ,useEffect } from "react";
import classnames from "classnames";
import {NavbarBrand, Navbar, NavItem, NavLink, Container,  Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cookies from "react-cookies"
import { logoutUser } from "../ActionCreators/UserCreators";
import Api, { endpoints } from '../configs/Apis';
import { Button } from "bootstrap";
import { useNavigate } from 'react-router-dom';
import ScrollToTop from "../layouts/ScrollToTop";
import { select } from "react-cookies";

export default function Admin() {
    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = useState(false);
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const navigate = useNavigate()

    //load category
    
    //Scroll của navbar

      
            const logout = (event) => {
                  event.preventDefault()

                  cookies.remove('access_token')
                  cookies.remove('user')
                  dispatch(logoutUser())
              }

            const search = (event) => {
                event.preventDefault()
                navigate(`/?q=${q}`)
            }
        let path = <>
            <Link className='nav-link text-success' to='/login'>Login</Link>
            <Link className='nav-link text-success' to='/register'>Register</Link>

        </>
        if (user !== null && user != undefined){ 
          if(user.is_superuser)
          {
              path = <>
                <div className='user-img'>
                    <Link className='img-user text-success' to='/'>
                        <img className='avt' src={'/static' + user.avatar} alt='avatar'/>user admin
                    </Link>
                </div>
                <Link className='nav-link text-success' to='#' onClick={logout}>Logout</Link>
            </>
          }
          else
          {
           console.info('Ban ko phai admin')
        }
      }
      else{
        console.info('Ban ko dung ten dn')
      }
      //scroll To top của Trang chủ

      return (
        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link className="nav-link text-success" to="/">Travel Tour</Link>
                <Link className="nav-link text-success" to="/admin">Trang chủ</Link>
            </Nav>
            <NavItem>
              <NavLink  >
               {path}
              </NavLink>
            </NavItem>
            
            </Navbar.Collapse> 
        </Container>
      </Navbar>
        
      );
    }
