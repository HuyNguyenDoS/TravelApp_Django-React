import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import API, { endpoints } from '../configs/Apis';
import cookies from 'react-cookies'
import WOW from 'wowjs';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Rating } from "@mui/material";
import NumberFormat from 'react-number-format';
import advice1 from "../static/image/advice/advice-1.jpg"
import PreLoader from "../components/PreLoader"
import MessageSnackbar from "../components/MessageSnackbar";


export default function TourDetail() {
    const [tour, setTour] = useState([])
    const [services, setServices] = useState([])

    const [rating, setRating] = useState(0)

    const [comment, setComment] = useState("")
    const [listComment, setListComment] = useState([])
    const [commentChange, setCommentChange] = useState(0)

    const { tourId } = useParams()

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

    useEffect(() => {
        let getTour = async() => {
            try {
                let res = await API.get(endpoints['tour-details'](tourId), {
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                setServices(res.data.service)
                setTour(res.data)
                setRating(res.data.rate)
            } catch (error) {
                console.error(error)
            }
        }

        let getComments = async() => {
            try {
                let res = await API.get(endpoints['tour-comments'](tourId))
                setListComment(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        getComments()
        getTour()
    }, [tourId, commentChange])

    /* Handle Comment Function */
    const handleChange = (event) => {
        setComment(event.target.value)
    }

    const addRating = async (event, newValue) => {
        if (user != null) {
            if (window.confirm("Bạn xác nhận đánh giá tour này ?") === true) {
                try {
                    let res = await API.post(endpoints['rating'](tourId), {
                        "rating": newValue
                    }, {
                        headers: {
                            'Authorization': `Bearer ${cookies.load('access_token')}`
                        }
                    })
                    if (res.status === 200 || res.status === 201) {
                        setOpen(true)
                        createMessage('Thành công', 'Đánh giá tour thành công !', 'success')
                        setRating(newValue);
                    }
                } catch (error) {
                    setOpen(true)
                    createMessage('Lỗi', 'Đánh giá tour thất bại !', 'error')
                    console.error(error)
                }
            }
        } else {
            setOpen(true)
            createMessage('Cảnh báo', 'Hãy đăng nhập để có thể đánh giá !', 'warning')
        }
    }
    

    const addComment = async (event) => {
        event.preventDefault()
        if (user != null) {
            try {
                let res = await API.post(endpoints['add-comment-tour'](tourId), {
                    "content": comment
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                
                if (res.status === 201) {
                    listComment.push(res.data)
                    setListComment(listComment)
                    setCommentChange(listComment.length)
                    setComment('')

                    setOpen(true)
                    createMessage('Thành công', 'Đăng bình luận tour thành công !', 'success')
                }
            } catch (error) {
                console.error(error)
                setOpen(true)
                createMessage('Lỗi', 'Đăng bình luận tour thất bại !', 'error')
            }
        }
        else {
            setOpen(true)
            createMessage('Cảnh báo', 'Hãy đăng nhập để có thể bình luận !', 'warning')
        }
    }
    /* End Comment Function */
    if (tour.length === 0) {
        return <PreLoader />
    }

    return (
        <>
            <section className="page-title style-three" style={{ backgroundImage: `url(${tour.imageTour})` }}>
                <div className="auto-container">
                    <div className="inner-box wow fadeInDown animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <div className="rating"><span><i className="fas fa-star"></i>{tour.rating}</span></div>
                        <h2 style={{ width: "750px" }}>{tour.tour_name}</h2>
                        <h3 >
                        <NumberFormat
                            value={tour.price_of_tour}
                            displayType={'text'}
                            thousandSeparator={true}
                            // prefix={'$'}
                            style={{color:'orange',fontSize:'50px'}}
                            />đ / 1 người
                        </h3>    
                    </div>
                </div>
            </section>

            <section className="tour-details">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="tour-details-content">
                                <div className="inner-box">
                                    <div className="text">
                                        <h2>Mô tả</h2>
                                        <p dangerouslySetInnerHTML={{__html: `${tour.description}`}} />
                                        <ul className="info-list clearfix">
                                            <li><i className="far fa-clock"></i>{tour.duration}</li>
                                            <li><i className="far fa-user"></i>Đang cập nhật</li>
                                            <li><i className="far fa-map"></i>Đang cập nhật</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="overview-inner">
                                    <ul className="overview-list clearfix">
                                        <li><span>Còn:</span>{tour.slots} xuất</li>
                                        <li><span>Điểm khởi hành:</span>{tour.departure}</li>
                                        <li><span>Thời gian khởi hành:</span>{tour.depart_date}</li>
                                        <li className="clearfix"><span>Bao gồm:</span>
                                            {/* <ul className="included-list clearfix">
                                                {services.map(s => <li key={s.id}>{s.name}</li>)}
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                                <div className="tour-plan">
                                    <div className="text">
                                        <h2>Kế hoạch tour</h2>
                                        <p dangerouslySetInnerHTML={{__html: `${tour.tour_plan}`}} />
                                    </div>
                                </div>
                                <div className="photo-gallery">
                                    <div className="text">
                                        <Link className="photo-gallery-link" to={"/tour-detail/" + tourId + "/gallery"}>
                                            Bộ sưu tập ảnh <span> </span>
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="comment-box">
                                    <div className="text">
                                        <h2>Đánh giá</h2>
                                        <Rating name="simple-controlled"
                                        size="large"
                                        value={rating}
                                        onChange={addRating}
                                        />
                                    </div>
                                    <div>
                                    <form onSubmit={addComment} className="comment-form">
                                        <div className="row clearfix">
                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                <textarea placeholder="Nội dung" value={comment} 
                                                    onChange={(event) => handleChange(event)}/>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                <button type="submit" className="theme-btn">Gửi</button>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                    <hr />
                                    <div className="group-title">
                                        <h2>{listComment.length} Bình luận</h2>
                                    </div>

                                    <div className="comment-box-content">
                                        {listComment.map(c => <CommentItem key={c.id} comment={c} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="default-sidebar tour-sidebar ml-20">
                                <div className="sidebar-widget downloads-widget">
                                    <div className="form-widget">
                                        <div className="widget-title">
                                            <h3>Đặt Tour</h3>
                                        </div>
                                        <Link to={"/tour-detail/" + tourId + "/booking-1"} style={{ color: "#fff" }}>
                                            <button type="submit" className="theme-btn">Nhấn vào đây</button>
                                        </Link>
                                    </div>
                                    <div className="widget-title">
                                        <h3>Tải xuống</h3>
                                    </div>
                                    <div className="widget-content">
                                        <ul className="download-links clearfix">
                                            <li>
                                                <Link to="/">Hướng dẫn
                                                    <i className="fas fa-download"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">Tài liệu du lịch
                                                    <i className="fas fa-download"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">Logo & Nội dung
                                                    <i className="fas fa-download"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="advice-widget">
                                    <div className="inner-box"
                                        style={{ backgroundImage: `url(${advice1})` }}>
                                        <div className="text">
                                            <h2>Get <br />25% Off <br />On New York Tours</h2>
                                        </div>
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
    )
}
class CommentItem extends React.Component {
    render() {
        return (
            <>
                <div className="comment">
                    <figure className="thumb-box">
                        <Avatar
                            alt="ImageComment"
                            src={this.props.comment.user.avatar_url}
                            sx={{ width: 52, height: 52 }}
                        />
                    </figure>
                    <div className="comment-inner">
                        <div className="comment-info clearfix">
                            <span className="post-date">{this.props.comment.created_date}</span>
                        </div>
                        <p>
                            {this.props.comment.content}
                        </p>
                        <div className="author-comment">
                            <span>Bình luận bởi:</span> {this.props.comment.user.username}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}