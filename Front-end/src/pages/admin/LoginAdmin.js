
import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import API, { endpoints } from '../../configs/Apis';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../ActionCreators/UserCreators';
import cookies from 'react-cookies';


export default function Login() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const login = async (event) => {
      event.preventDefault()

      try {
        let info = await API.get(endpoints['oauth2-info'])
        let res = await API.post(endpoints['login'], {
          'client_id': info.data.client_id,
          'client_secret': info.data.client_secret,
          'username': username,
          'password': password,
          'grant_type': 'password'
      })

     
      cookies.save('access_token', res.data.access_token)

      let user = await API.get(endpoints['current-user'], {
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
      <section className="register-section sec-pad">
                <div className="auto-container">
                    <div className="inner-box">
                        <div className="sec-title centred">
                            <p>Đăng Nhập Bằng Admin</p>
                        </div>
                        <div className="form-inner">
                        <form onSubmit={login} className="register-form">
                                <div className="row clearfix">
                                    <LoginForm
                                        id="username"
                                        label="Tên đăng nhập"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        type="text"
                                        placeholder="Nhập Tên Đăng Nhập"
                                    />
                                    <LoginForm
                                        id="password"
                                        label="Mật khẩu"
                                        field={password}
                                        change={event => setPassword(event.target.value)}
                                        type="password"
                                        placeholder="Nhập Mật Khẩu"
                                    />
                                    <div className="col-lg-12 col-md-12 col-sm-12 column" style={{display:'flex'}}>
                                        <div className="form-group message-btn">
                                            <button type="submit" className="theme-btn">
                                                Đăng Nhập
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}
class LoginForm extends React.Component {
  render() {
      return (
          <>
              <div className="col-lg-12 col-md-12 col-sm-12 column">
                  <div className="form-group">
                      <label>{this.props.label}</label>
                      <input
                          value={this.props.field}
                          type={this.props.type}
                          id={this.props.id}
                          onChange={this.props.change}
                          required />
                  </div>
              </div>
          </>
      )
  }
}



