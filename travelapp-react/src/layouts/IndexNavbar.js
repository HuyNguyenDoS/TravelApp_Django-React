import React from "react";
import classnames from "classnames";
import {NavbarBrand, Navbar, NavItem, NavLink, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cookies from "react-cookies"
import { logoutUser } from "../ActionCreators/UserCreators";

function IndexNavbar() {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const toggleNavbarCollapse = () => {
      setNavbarCollapse(!navbarCollapse);
      document.documentElement.classList.toggle("nav-open");
    };
    React.useEffect(() => {
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
    
            cookies.remove("access_token")
            cookies.remove("user")
            dispatch(logoutUser())
        }
        let path = <>
        <Link className="nav-link text-success"  to="/login">Đăng nhập</Link>
        <Link className="nav-link text-success"  to="/register">Đăng kí</Link>
        </>
        if (user !== null && user !== undefined) {
        path = <>
            <Link className="nav-link text-success "  to="/">{user.username}</Link>
            <Link className="nav-link text-success"  onClick={logout}>Đăng xuất</Link>
            </>
    }
      return (
        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" >
          <Container>
            <div className="navbar-translate">
              <NavbarBrand
                data-placement="bottom"
                href="/index"
                target="_blank"
                title="Coded by Creative Tim"
              >
                Travel Tour
              </NavbarBrand>
            
            </div>
            
                <NavItem >
                  <NavLink
                    href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-index-navbar"
                    target="_blank"
                    className="text-success" 
                  >
                     Documentation
                  </NavLink>
                </NavItem>
            <NavItem>
                  <NavLink
                    href="https://demos.creative-tim.com/paper-kit-react/#/documentation?ref=pkr-index-navbar"
                    target="_blank"
                    className="text-success" 
                  >
                    Documentation
                  </NavLink>
            </NavItem>
            <NavItem > 
                <NavLink 
                  >
                  {/* {path} */}
                </NavLink>
               
            </NavItem>
          </Container>
        </Navbar>
        
      );
    }
    
    export default IndexNavbar;