
import React, { useState } from 'react';
import { Row} from "react-bootstrap" 
import { Col, Form } from 'react-bootstrap';
import Apis, { endpoints } from '../configs/Apis';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../ActionCreators/UserCreators';
import cookies from 'react-cookies';
import IndexNavbar from '../layouts/IndexNavbar';


function LoginAdmin() {

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
        navigate('/admin');
      } catch(err) {
        console.error(err)
      }
  }

  return (
    <>
         <IndexNavbar/>
       <Row xs={{ cols: 1 }} md={{ cols: 1 }} className="g-4">
                <Col xs>
                <Form onSubmit={login} style={{marginTop:'200px'}}  >
                    <h1 className="text-center text-danger">ĐĂNG NHẬP ADMIN</h1>
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
                  
                    <Button variant="primary" type="submit" style={{marginLeft:'700px',padding:'15px',textAlign:'center'
                    ,borderRadius:'20px',border:'2px' ,backgroundColor:'blue',color:'white'}}>
                      Đăng nhập
                    </Button>
                  </Form>
                </Col>


               
            </Row>
      
    
    </>
  )
}
export default LoginAdmin;


