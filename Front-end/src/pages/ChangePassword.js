import React, { useEffect, useState } from 'react';
import API, { endpoints } from '../configs/Apis';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import cookies from 'react-cookies';
import { useSelector } from 'react-redux';
import WOW from 'wowjs';

import pageTitle9 from "../static/image/background/page-title-9.jpg"
import shape16 from "../static/image/shape/shape-16.png"
import shape17 from "../static/image/shape/shape-17.png"
import MessageSnackbar from '../components/MessageSnackbar';

export default function ChangePassword(props) {
    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let user = useSelector(state => state.user.user)

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

    const changePassword = (event) => {
        event.preventDefault()

        let changeNewPassword = async () => {
            const formData = new FormData()
            formData.append("old_password", oldPassword);
            formData.append("new_password", newPassword);

            try {
                let res = await API.post(endpoints['change-password'], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                if (res.status === 200) {
                    setOpen(true)
                    createMessage('Thành công', 'Đổi mật khẩu thành công !', 'success')
                    navigate("/")
                }
            } catch (error) {
                console.error(error)
            }
        }

        let alphabet_count = 0;
        let number_count = 0;
        for (let i = 0; i < newPassword.length; i++) {
            let c = newPassword.charAt(i);

            if ('A' <= c && c <= 'Z') {
                alphabet_count += 1;
            } else if ('a' <= c && c <= 'z') {
                alphabet_count += 1;
            } else if ('0' <= c && c <= '9') {
                number_count += 1;
            }
        }

        if (user != null) { 
            if (newPassword.length > 7) {
                if (alphabet_count === 0 || number_count === 0) {
                    setOpen(true)
                    createMessage('Invalid Password', 'Hãy đặt mật khẩu có cả kí tự chữ và số !', 'warning')
                } else {
                    if (newPassword === confirmPassword) {
                        changeNewPassword()
                    } else {
                        setOpen(true)
                        createMessage('Cảnh báo', 'Mật khẩu xác nhận không chính xác', 'warning')
                    }
                }
            } else {
                setOpen(true)
                createMessage('Invalid Password', 'Hãy đặt mật khẩu tối thiểu 8 kí tự !', 'warning')
            }
        } else {
            setOpen(true)
            createMessage('Cảnh báo', 'Hãy đăng nhập để đổi mật khẩu !', 'warning')
        }
    }

    
    return (
        <>
            <section className="page-title centred" style={{ backgroundImage: `url(${pageTitle9})` }}>
                <div className="auto-container">
                <div className="content-box wow fadeInDown animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                    <h1>Đổi Mật Khẩu</h1>
                    <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                </div>
                </div>
            </section>
            <section className="register-section sec-pad">
                <div className="anim-icon">
                    <div className="icon anim-icon-1" style={{ backgroundImage: `url(${shape16})` }}/>
                    <div className="icon anim-icon-2" style={{ backgroundImage: `url(${shape17})` }}/>
                </div>
                <div className="auto-container">
                    <div className="inner-box">
                        <div className="sec-title centred wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                            <p>Đổi Mật Khẩu</p>
                            <h2>Connect with us for Better Tour</h2>
                        </div>
                        <div className="form-inner">
                            <h3>Đăng nhập với</h3>
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
                            <form onSubmit={changePassword} className="register-form">
                                <div className="row clearfix">
                                    <ChangePassForm class="col-lg-12 col-md-12 col-sm-12 column"
                                        id="oldPassword" label="Mật khẩu cũ" type="password" value={oldPassword} change={(event) => setOldPassword(event.target.value)}/>
                                    <ChangePassForm class="col-lg-12 col-md-12 col-sm-12 column"
                                        id="newPassword" label="Mật khẩu mới" type="password" value={newPassword} change={(event) => setNewPassword(event.target.value)}/>
                                    <ChangePassForm class="col-lg-12 col-md-12 col-sm-12 column"
                                        id="confirmPass" label="Xác nhận mật khẩu mới" type="password" value={confirmPassword} change={(event) => setConfirmPassword(event.target.value)}/>   
                                    <div className="col-lg-12 col-md-12 col-sm-12 column">
                                        <div className="form-group message-btn">
                                            <button type="submit" className="theme-btn">
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="other-text">
                                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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

class ChangePassForm extends React.Component {
    render() {
        return (
            <>
                <div className={this.props.class}>
                    <div className="form-group">
                        <label>{this.props.label}</label>
                        <input
                            value={this.props.value}
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