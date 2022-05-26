import React, { useEffect, useState } from 'react';
import API, { endpoints } from '../configs/Apis';
import cookies from 'react-cookies'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import WOW from 'wowjs';
import {loginUser} from '../ActionCreators/UserCreators'
import pageTitle5 from "../static/image/background/page-title-5.jpg";
import shape16 from "../static/image/shape/shape-16.png";
import shape17 from "../static/image/shape/shape-17.png";
import MessageSnackbar from '../components/MessageSnackbar';
import Header from '../components/Header';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // State of message
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('')
    const [typeMsg, setTypeMsg] = useState('')
    const [titleMsg, setTitleMsg] = useState('')

    const handleMessageClose = () => {
        setOpen(false);
    };

    const createMessage = (title, msg, type) => {
        setMsg(msg)
        setTitleMsg(title)
        setTypeMsg(type)
    }
    // End message

    useEffect(() => {
        new WOW.WOW({live: false}).init();
    }, [])
    
    const login = async (event) => {
        event.preventDefault();

        try {
            let oAuthInfo = await API.get(endpoints['oauth2-info'])
            let res = await API.post(endpoints['login'], {
                'client_id': oAuthInfo.data.client_id,
                'client_secret': oAuthInfo.data.client_secret,
                'username': username,
                'password': password,
                'grant_type': 'password'
            });

            if (res.status === 200) {
                setOpen(true)
                createMessage('Thành công', 'Đăng nhập thành công !', 'success')
                cookies.save("access_token", res.data.access_token);

                let user = await API.get(endpoints['current-user'], {
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                console.info(user)
    
                cookies.save('user', user.data)
                dispatch(loginUser(user.data))
                navigate('/');
            }
        } catch (err) {
            console.error(err)

            setOpen(true)
            createMessage('Lỗi', 'Sai tên tài khoản hoặc mật khẩu. Đảm bảo nhập đúng tên tài khoản và mật khẩu !', 'error')
        }
    }
    
    let path = <>
      <Link  to='/loginAdmin' variant="primary" type="submit"  className="theme-btn">
            Đăng nhập bằng Admin
      </Link>
    </>
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
                            <form onSubmit={login} className="register-form">
                                <div className="row clearfix">
                                    <LoginForm
                                        id="username"
                                        label="Tên đăng nhập"
                                        field={username}
                                        change={event => setUsername(event.target.value)}
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
                                    <div className="col-lg-12 col-md-12 col-sm-12 column">
                                        <div className="form-group">
                                            <div className="forgor-password text-right">
                                                <Link to="/forgot-password">Quên mật khẩu?</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 column" style={{display:'flex'}}>
                                        <div className="form-group message-btn">
                                            <button type="submit" className="theme-btn">
                                                Đăng Nhập
                                            </button>
                                        </div>
                                        <div className="form-group message-btn"style={{marginLeft:'50px'}}>
                                            {path}
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="other-text">
                                Chưa có tài khoản? <Link to="/register">Đăng Ký Ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <MessageSnackbar
                handleClose={handleMessageClose}
                isOpen={open}
                msg={msg}
                type={typeMsg}
                title={titleMsg}
            />
        </>
    )
}

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
