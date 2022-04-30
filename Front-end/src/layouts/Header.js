import { useState ,useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cookies from 'react-cookies';
import { logoutUser } from '../ActionCreators/UserCreators';
import Api, { endpoints } from '../configs/Apis';

export default function Header() {

    const [categories, setCategories] = useState([])
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()


    useEffect(() => {
      let loadCategories = async () => {
          let res = await Api.get(endpoints['categories'])

          setCategories(res.data)
      }
      
      loadCategories()
      }, [])
      
    const logout = (event) => {
        event.preventDefault()

        cookies.remove('access_token')
        cookies.remove('user')
        dispatch(logoutUser())
    }

    let path = <>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>

    </>
    if (user !== null && user != undefined){ 
        
        path = <>
            <div className='user-img'>
                <Link className='img-user' to='/'>
                    <img className='avt' src={'/static' + user.avatar} alt='avatar'/>{user.username}
                </Link>
            </div>
            <Link className='nav-link text-danger' to='#' onClick={logout}>Logout</Link>
        </>
    }
    return (   
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">eCourseApp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" to="/">Trang chu</Link>
                {categories.map(c => {
                  let path = `/?category_id=${c.id}`
                  return <Link className="nav-link" to={path}>{c.name}</Link>
                })
                }

                {path}
              </Nav>
              {/* <Form className="d-flex" onSubmit={search}>
                  <FormControl
                    type="search"
                    placeholder="Nhap tu khoa..."
                    className="mr-2"
                    aria-label="Search"
                    value={q}
                    onChange={(event) => setQ(event.target.value)}
                  />
                  <Button type="submit" variant="outline-success">Tim</Button>
                </Form> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

