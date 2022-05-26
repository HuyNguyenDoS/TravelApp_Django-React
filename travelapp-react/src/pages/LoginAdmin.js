
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
import Header from '../components/Header';
import { Link} from 'react-router-dom'; 
import pageTitle5 from "../static/image/background/page-title-5.jpg";
import shape16 from "../static/image/shape/shape-16.png";
import shape17 from "../static/image/shape/shape-17.png";

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
      <Header/>
      
      <section className="page-title centred"style={{ backgroundImage: `url(${pageTitle5})` }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms">
                        <h1>Đăng Nhập</h1>
                        <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                    </div>
                </div>
      </section>
      <section className="register-section sec-pad">
                <div className="anim-icon">
                    <div
                        className="icon anim-icon-1"
                        style={{
                            backgroundImage: `url(${shape16})`
                        }}
                    />
                    <div
                        className="icon anim-icon-2"
                        style={{
                            backgroundImage: `url(${shape17})`
                        }}
                    />
                </div>
                <div className="auto-container">
                    <div className="inner-box">
                        <div className="sec-title centred">
                            <p>Đăng Nhập</p>
                            <h2>Kết nối với chúng tôi để có chuyến tham quan tốt hơn</h2>
                        </div>
                        <div className="form-inner">
                            <h3>Đăng Nhập với</h3>
                            <ul className="social-links clearfix">
                                <li>
                                    <Link to="/">
                                        <span>Đăng Nhập với Facebook _</span>
                                        <i className="fab fa-facebook-f" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <span>Đăng Nhập với Google _</span>
                                        <i className="fab fa-google-plus-g" />
                                    </Link>
                                </li>
                            </ul>
                            <div className="text">
                                <span>hoặc</span>
                            </div>
                <Form onSubmit={login}  >
                    <div className="row clearfix">
                    <h1 className="text-center text-success">ĐĂNG NHẬP ADMIN</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Tên đăng nhập</Form.Label>
                      <Form.Control type="text" 
                                    placeholder="Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control type="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <div className="col-lg-12 col-md-12 col-sm-12 column">
                        <div className="form-group">
                             <div className="forgor-password text-right">
                                <Link to="/forgot-password">Quên mật khẩu?</Link>
                            </div>
                         </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 column">
                        <div className="form-group message-btn">
                            <Button  type="submit" className="theme-btn">
                            Đăng nhập
                            </Button>
                        </div>
                    </div>
                    </div>
                  </Form>
                  <div className="other-text">
                                Chưa có tài khoản? <Link to="/register">Đăng Ký Ngay</Link>
                 </div>        
                        </div>
                    </div>
                </div>
            </section>
    
    </>
  )
}
export default LoginAdmin;

function LoginForm(props){
  return (
      <>
          <div className="col-lg-12 col-md-12 col-sm-12 column">
              <div className="form-group">
                  <label>{props.label}</label>
                  <input
                      value={props.field}
                      type={props.type}
                      id={props.id}
                      onChange={props.change}
                      required />
              </div>
          </div>
      </>
  )
}

