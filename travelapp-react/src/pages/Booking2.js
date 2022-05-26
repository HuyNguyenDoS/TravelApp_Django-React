import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API, { endpoints } from '../configs/Apis';
import PreLoader from '../components/PreLoader';
import PayContext from '../context/PayContext';
import WOW from 'wowjs';
import Header from '../components/Header';
import pageTitle5 from '../static/image/background/page-title-5.jpg'
import logoZaloPay from '../static/image/card/logo-zalopay.svg'
import MessageSnackbar from '../components/MessageSnackbar';
import NumberFormat from 'react-number-format';

function Booking2(props) {
    const navigate = useNavigate()
    const { tourId } = useParams()
    const payDetails = useContext(PayContext)
    const [tour, setTour] = useState([]);
    const [note, setNote] = useState("");
    const [payments, setPayments] = useState("")

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

    const handleSubmit = (event) => {
        event.preventDefault()

        const submitPayment = async () => {
            const formData = new FormData()
            formData.append('total_amount', payDetails.total)
            formData.append('tour_id', tourId)
            formData.append('note', note)
            formData.append('payer_id', payDetails.payerId)
            formData.append('status_payer', "0")
            let invId = ""
            let urlPayment = ""
            let paymentType = ""

            try {
                let res = await API.post(`${endpoints['payers']}${payDetails.payerId}/add-invoice/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if(res.data.id !== null) {
                    invId = res.data.id
                    formData.append('invoice_id', res.data.id)
                }

                if (payments === "1") { 
                    paymentType = 'momo-payment'
                } else if (payments === "3") {
                    paymentType = 'zalopay-payment'
                }

                if (paymentType !== "") {
                    let res = await API.post(endpoints[paymentType], formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    urlPayment = res.data.orderUrl
                }

                if (urlPayment !== "") {
                    window.location.href = urlPayment;
                } else {
                    navigate(`/tour-detail/${tourId}/booking-3/${invId}/${2}/confirm`)
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (payments !== "") {
            submitPayment()
        } else {
            setOpen(true)
            createMessage('Cảnh báo', 'Vui lòng chọn phương thức thanh toán !', 'warning')
        }
    }

    useEffect(() => {
        let getTour = async () => {
            try {
                let res = await API.get(endpoints['tour-details'](tourId))
                setTour(res.data)
            } catch (error) {
                console.error(error);
            }
        }
        getTour()
    }, [tourId])

    if (tour.length ===  0) {
        return <PreLoader />
    }

    return (
        <>
        <Header/>
            <section className="page-title centred" style={{ backgroundImage: `url(${pageTitle5})` }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms">
                        <h1>Thanh Toán</h1>
                        <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                    </div>
                </div>
            </section>

            <section className="booking-section booking-process-2">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="booking-process-content mr-20">
                                <ul className="process-label clearfix">
                                    <li>
                                        <span>1.</span>Nhập thông tin
                                    </li>
                                    <li className="current">
                                        <span>2.</span>Thanh toán
                                    </li>
                                    <li>
                                        <span>3.</span>Xác nhận
                                    </li>
                                </ul>
                                <div className="inner-box">
                                    <form onSubmit={handleSubmit} className="processing-form">
                                        <div className="row clearfix">
                                            <div className="col-lg-12 col-md-12 col-sm-12 column">
                                                <div className="form-group">
                                                    <label>Ghi chú</label>
                                                    <textarea id="message"
                                                    value={note} onChange={(event) => setNote(event.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="payment-option">
                                            <h3>Chọn Hình Thức Thanh Toán</h3>
                                            <div className="row clearfix">
                                                <div className="col-lg-6 col-md-6 col-sm-12 column">
                                                    <FormControl component="fieldset">
                                                    <RadioGroup
                                                        aria-label="payment"
                                                        name="radio-buttons-group"
                                                        value={payments}
                                                        onChange={(event) => setPayments(event.target.value)}
                                                    >
                                                        <FormControlLabel 
                                                            value="2" 
                                                            control={<Radio />} 
                                                            label="Thanh toán tiền mặt tại quầy" 
                                                        />
                                                        <FormControlLabel 
                                                            value="1" 
                                                            control={<Radio />} 
                                                            label={<>Thanh toán bằng Ví <img style={{width: '30px'}} src="https://developers.momo.vn/v2/images/logo.svg" alt=""/></>} 
                                                        />
                                                        <FormControlLabel 
                                                            value="3" 
                                                            control={<Radio />} 
                                                            label={<>Thanh toán bằng Ví <img src={logoZaloPay} alt=""/></>} 
                                                        />
                                                    </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 column">
                                                    <div className="form-group message-btn clearfix">
                                                        <Link to={"/tour-detail/" + tourId + "/booking-1"} className="theme-btn">
                                                            <i className="fas fa-angle-left" />
                                                            Trở lại
                                                        </Link>
                                                        <button type="submit" className="theme-btn">
                                                            Xác nhận
                                                            <i className="fas fa-angle-right" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="process-sidebar ml-20">
                                <div className="content-box">
                                    <h3>Thông Tin</h3>
                                    <figure className="image-box">
                                        <img src={tour.imageTour} alt="ImageSidebar" />
                                    </figure>
                                    <h4>{tour.tour_name}</h4>
                                    <ul className="info clearfix">
                                        <li>
                                            <i className="far fa-calendar-alt" />
                                            Từ: <span>{tour.depart_date}</span>
                                        </li>
                                        <li>
                                            <i className="far fa-calendar-alt" />
                                            Tới: <span>Đang cập nhật</span>
                                        </li>
                                        <li>
                                            <i className="fas fa-user-alt" />
                                            Khách: <span>{payDetails.adults} người lớn, {payDetails.childs} trẻ em</span>
                                        </li>
                                        {/* <li>
                                            <i className="fas fa-user-alt" />
                                            Chỗ còn lại: <span>{tour.slots}</span>
                                        </li> */}
                                        <li>
                                            <i className="fas fa-money-bill" />
                                            <NumberFormat
                                                value={tour.price_of_tour_child}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={' Trẻ em: '}
                                                /><span> đ </span>
                                        </li>
                                        <li>
                                            <i className="fas fa-money-bill" />
                                            <NumberFormat
                                                value={tour.price_of_tour}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'Người lớn:'}
                                                /><span> đ </span>
                                        </li>
                                        <li>
                                            <i className="fas fa-money-bill" />
                                            <NumberFormat
                                                value={tour.price_of_room}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={' Tiền phòng:'}
                                                /><span> đ </span>
                                        </li>
                                    </ul>
                                    <div className="price">
                                        <h4><NumberFormat
                                                value= {payDetails.total}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={' Total:'}
                                                /><span> đ </span>
                                        </h4>
                                    </div>
                                </div>
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
    );
}

export default Booking2;