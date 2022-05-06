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
import ScrollToTop from "./ScrollToTop";
import { select } from "react-cookies";

export default function IndexNavbar() {
    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = useState(false);
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [q, setQ] = useState("")
    const navigate = useNavigate()

    //load category
    useEffect(() => {
      let loadCategories = async () => {
          let res = await Api.get(endpoints['categories'])

          setCategories(res.data)
      }
      
      loadCategories()
      }, [])
    //Scroll của navbar
    const toggleNavbarCollapse = () => {
      setNavbarCollapse(!navbarCollapse);
      document.documentElement.classList.toggle("nav-open");
    };

    useEffect(() => {
        const updateNavbarColor = () => {
          if (
            document.documentElement.scrollTop > 299 ||
            document.body.scrollTop > 299
          ) {
            setNavbarColor("");
          } else if (
            document.documentElement.scrollTop < 300 ||
            document.body.scrollTop < 300
          ) {
            setNavbarColor("navbar-transparent");
          }
        };
    
        window.addEventListener("scroll", updateNavbarColor);
    
        return function cleanup() {
          window.removeEventListener("scroll", updateNavbarColor);
        };
      });

      
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
        
          path = <>
              <div className='user-img'>
                  <Link className='img-user text-success' to='/'>
                      <img className='avt' src={'/static' + user.avatar} alt='avatar'/>{user.username}
                  </Link>
              </div>
              <Link className='nav-link text-success' to='#' onClick={logout}>Logout</Link>
          </>
      }
      //scroll To top của Trang chủ
        const [showTopBtn, setShowTopBtn] = useState(false);
        useEffect(() => {
          window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
              setShowTopBtn(true);
            } else {
              setShowTopBtn(false);
            }
          });
        }, []);
        const goToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        };

      return (
        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" >
          <Container>
            <div className="navbar-translate">
              <NavbarBrand
                onClick={goToTop}
              >
                TravelTour
              </NavbarBrand>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  <Link className="nav-link text-success" to="/">Trang chủ</Link>
                  {categories.map(c => {
                    let path = `/?category_id=${c.id}`
                    return <Link className="nav-link text-success" to={path}>{c.name}</Link>
                  })
                  }
              </Nav>
              <NavItem>
                <NavLink  >
                 {path}
                </NavLink>
              </NavItem>
              <NavItem>
                <Form  className="d-flex" onSubmit={search}>
                    <Form.Group >
                        <FormControl style={{marginLeft:10 ,color:"green"}}
                          type="search"
                          placeholder="Nhập từ khóa..."
                          className="mr-2"
                          aria-label="Search"
                          value={q}
                          onChange={(event) => setQ(event.target.value)}
                        />
                      </Form.Group>
                      <button style={{marginLeft:12 ,color:"green",borderRadius:10}} type="submit" variant="outline-success">Tìm</button>
                  </Form>
              </NavItem>
              
              </Navbar.Collapse> 
          </Container>
        </Navbar>
        
      );
    }
