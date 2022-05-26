import React from "react";
import { useState ,useEffect } from "react";
import classnames from "classnames";
import { Navbar, NavItem, NavLink, Container,  Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cookies from "react-cookies"
import { logoutUser } from "../ActionCreators/UserCreators";
import { Link } from 'react-router-dom'
import IndexHeader from '../components/IndexHeader';
import { useNavigate } from 'react-router-dom';

//trang chủ admin
export default function Admin() {
    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = useState(false);
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
            const logout = (event) => {
                  event.preventDefault()

                  cookies.remove('access_token')
                  cookies.remove('user')
                  dispatch(logoutUser())
                  navigate('/');
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
                        <img className='avt' src={user.avatar} alt='avatar'/>user admin
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

      return (
        <>
        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link className="nav-link text-success" to="/">Travel Tour</Link>
                <Link className="nav-link text-success" to="/admin">Trang Admin</Link>
                {/* <Link className="nav-link text-success" to="/show">Tours</Link> */}
                <Link className="nav-link text-success" to="/addArtical">Quản lý trang tin tức </Link>
                <Link className="nav-link text-success" to="/deleteTour">Quản lý trang chuyến đi </Link>
            </Nav>
            <NavItem>
              <NavLink  >
               {path}
              </NavLink>
            </NavItem>
            
            </Navbar.Collapse> 
        </Container>
      </Navbar>
      <div style={{marginTop:'150px'}}>

      </div>
      <IndexHeader/>
      <div style={{marginTop:'50px'}}>

      </div>
      </>
                   
      );
    }
