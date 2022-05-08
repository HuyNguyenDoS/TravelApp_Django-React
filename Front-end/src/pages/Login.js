
import React, { useState } from 'react';
import { NavLink, Row} from "react-bootstrap" 
import { Link } from "react-router-dom";
import { Col, Form } from 'react-bootstrap';
import Apis, { endpoints } from '../configs/Apis';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../ActionCreators/UserCreators';
import cookies from 'react-cookies';
import {FaFacebookSquare,FaGoogle} from "react-icons/fa"


function Login() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const login = async (event) => {
      event.preventDefault()
      try {
        let info = await Apis.get(endpoints['oauth2-info'])
        let res = await Apis.post(endpoints['login'], {
          'client_id': info.data.client_id,
          'client_secret': info.data.client_secret,
          'username': username,
          'password': password,
          'grant_type': 'password'
      })

    
      cookies.save('access_token', res.data.access_token)

      let user = await Apis.get(endpoints['current-user'], {
        headers: {
          'Authorization': `Bearer ${cookies.load('access_token')}`,
        }
      })

      console.info(user)

      cookies.save('user', user.data)
        dispatch(loginUser(user.data))
        navigate('/');
      
    } catch(err) {
      console.error(err)
    }
    }

  return (
    <>
       <Row xs={{ cols: 2}} md={{ cols: 2 }} className="g-4">
                <Col xs>
                <Form onSubmit={login} style={{marginTop:'200px'}}  >
                    <h1 className="text-center text-danger">Đăng nhập</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" 
                                    placeholder="Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                  
                    <Button variant="primary" type="submit" style={{marginLeft:'300px'}}>
                      Đăng nhập
                    </Button>
                   
                    
                  </Form>
                </Col>
                
                let path = <>
                      <Link  to='/loginAdmin' variant="primary" type="submit"style={{margin:'200px 250px 30px 210px',backgroundColor:'blue',color:'white',padding:'10px',
                          textAlign:'center',borderRadius:'20px',border:'10px',marginTop:'10px'}}>
                            Đăng nhập bằng Admin
                      </Link>
                    </>
               
                <Col xs style={{marginTop:'190px',padding:'40px'}}>
                  <h1 className="text-center text-danger">Hoặc</h1>
                  <Button  type="submit" style={{margin:'10px',marginTop:'30px',padding:'10px 250px 10px 248px',display:'flex',borderRadius:'15px',backgroundColor:'white',color:'blue'}}>
                      Đăng nhập với Google <FaGoogle style={{margin:'5px'}}/>
                  </Button>
                  <Button variant="primary" type="submit"style={{margin:'10px',marginTop:'30px',padding:'10px 250px 10px 230px',borderRadius:'15px'}}>
                    Đăng nhập với Facebook <FaFacebookSquare style={{margin:'5px'}}/>
                  </Button>
                </Col>

     </Row>
      
    
    </>
  )
}
export default Login;


