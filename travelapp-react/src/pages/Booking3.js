import React, { useEffect, useState } from 'react';
import API, { endpoints } from '../configs/Apis';
import PreLoader from '../components/PreLoader';
import PayContext from '../context/PayContext';
import WOW from 'wowjs';
import { useLocation,useParams } from 'react-router-dom'
import pageTitle5 from '../static/image/background/page-title-5.jpg'
import Header from '../components/Header';
import NumberFormat from 'react-number-format';

function Booking3(props) {
    const { tourId, payType } = useParams()
    const [tour, setTour] = useState([])
    const [resultCode, setResultCode] = useState(-1)
    const payDetails = React.useContext(PayContext)

    const location = useLocation()

    useEffect(() => {
        new WOW.WOW({live: false}).init();
    }, [])

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

    let notification = <></>
    if (resultCode === 0) {
        notification = <>
            <div className="confirm-box">
                <h3>Thanh toán thành công</h3>
                <div className="inner-box centred">
                    <div className="icon-box">
                        <i className="far fa-check-circle" />
                    </div>
                    <h3>Cảm ơn đã đặt tour</h3>
                    <p>
                        Bạn sẽ nhận được email xác nhận trong thời gian ngắn
                        <br />
                    </p>
                </div>
            </div>
        </>
    } else if (resultCode === 1) {
        notification = <>
            <div className="confirm-box">
                <h3>Thanh toán thất bại</h3>
                <div className="inner-box centred">
                    <div className="icon-box">
                        <i style={{ color: 'red' }} className="far fa-times-circle" />
                    </div>
                    <h3>Vui lòng thử lại</h3>
                    <p>
                        Thắc mắc liên hệ tại
                        <br />
                    </p>
                </div>
            </div>
        </>
    } else if (resultCode === -1) {
        notification = <>
            <div className="confirm-box">
                <h3>Yêu cầu đặt tour đã được ghi nhận lại</h3>
                <div className="inner-box centred">
                    <div className="icon-box">
                        <i style={{ color: 'blue' }} className="far fa-check-circle" />
                    </div>
                    <h3>Cảm ơn đã sử dụng dịch vụ của chúng tôi</h3>
                    <p>
                        <br />
                    </p>
                </div>
            </div>
        </>
    }

    if (tour.length ===  0 || notification === <></>) {
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
                        <h1>Xác Nhận</h1>
                        <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                    </div>
                </div>
            </section>

            <section className="booking-section booking-process-3">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="booking-process-content mr-20">
                                <ul className="process-label clearfix">
                                    <li>
                                        <span>1.</span>Nhập thông tin
                                    </li>
                                    <li>
                                        <span>2.</span>Thanh toán
                                    </li>
                                    <li className="current">
                                        <span>3.</span>Xác nhận
                                    </li>
                                </ul>
                                {notification}
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
                                        <li>
                                            <i className="fas fa-user-alt" />
                                            Chỗ còn lại: <span>{tour.slot}</span>
                                        </li>
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
        </>
    );
}

export default Booking3;