import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from "react-router-dom";
import API, { endpoints } from '../configs/Apis';
import { useSelector } from 'react-redux';
import cookies from 'react-cookies'
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WOW from 'wowjs';
import Header from '../components/Header';

import pageTitle10 from "../static/image/background/page-title-10.jpg";
import advice1 from "../static/image/advice/advice-1.jpg";
import PreLoader from "../components/PreLoader";
import MessageSnackbar from '../components/MessageSnackbar';

function ArticalDetails(props) {
    const [artical, setArtical] = useState([])
    const [lastestArticals, setLastestArticals] = useState([])

    const [actionType, setActionType] = useState(1)
    const [stylebtLike, setstylebtLike] = useState(null)
    const [likesChange, setLikesChange] = useState(null)

    const [comment, setComment] = useState("")
    const [listComment, setListComment] = useState([])
    const [commentChange, setCommentChange] = useState(0)

    const { articalId } = useParams()

    let user = useSelector(state => state.user.user)

    // State of message
    const [open, setOpen] = useState(false);
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
        let getArtical = async() => {
            try {
                let res = await API.get(endpoints['artical-details'](articalId), {
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                setArtical(res.data)
                setActionType(res.data.type)
                if (res.data.type === 1 || res.data.type === -1)
                    setstylebtLike("outlined")
                else
                    setstylebtLike("contained")
            } catch (error) {
                console.error(error)
            }
        }

        let getComments = async() => {
            try {
                let res = await API.get(endpoints['artical-comments'](articalId))
                setListComment(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        getArtical()
        getComments()
    }, [articalId, commentChange, likesChange])
    
    /* Handle like function */
    const addLike = async (event) => {
        if (user != null) {
            let type = null
            if (actionType === 1 || actionType === -1) {
                type = 0
                setstylebtLike("contained")
            }
            else {
                type = 1
                setstylebtLike("outlined")
            }

            try {
                await API.post(endpoints['like'](articalId), {
                    "type": type
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                setActionType(type)
                setLikesChange(type)
            } catch (error) {
                console.error(error)
            }
        } else {
            setOpen(true)
            createMessage('Cảnh báo', 'Hãy đăng nhập để có thể like', 'warning')
        }
    }
    /* End Like Function */
    

    /* Handle Comment Function */
    const addComment = async (event) => {
        event.preventDefault()
        if (user != null) {
            try {
                let res = await API.post(endpoints['add-comment-artical'](articalId), {
                    "content": comment
                }, {
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                    }
                })
                
                if (res.status === 201) {
                    setOpen(true)
                    createMessage('Thành công', "Đăng bình luận thành công", 'success')

                    listComment.push(res.data)
                    setListComment(listComment)
                    setCommentChange(listComment.length)
                    setComment('')
                }
            } catch (error) {
                console.error(error)
                setOpen(true)
                createMessage('Lỗi', "Đăng bình luận thất bại", 'error')
            }
        }
        else {
            setOpen(true)
            createMessage('Cảnh báo', "Hãy đăng nhập để có thể bình luận", 'warning')
        }
    }

    if (artical.length === 0) {
        return <PreLoader />
    }

    return (
        <>
        <Header/>
            <section className="page-title centred" style={{ backgroundImage: `url(${pageTitle10})` }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <h1>Chi Tiết</h1>
                        <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                    </div>
                </div>
            </section>

            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="blog-details-content">
                                <div className="news-block-one">
                                    <div className="inner-box">
                                        <div className="lower-content">
                                            <div className="category">
                                                <Link to="/">
                                                <span className="post-date">
                                                    <i className="far fa-calendar-alt" />
                                                    {artical.created_date}
                                                </span>
                                                </Link>
                                            </div>
                                            <h2>{artical.title}</h2>
                                            <ul className="post-info clearfix">
                                                <li>
                                                    <span>Theo</span> <Link to="/">{artical.author}</Link>
                                                </li>
                                                <li>-</li>
                                                <li className="comment">
                                                    <Link to="/">{listComment.length} Bình luận</Link>
                                                </li>
                                                <li>-</li>
                                                <li>
                                                    <Link to="/">{artical.likes} likes</Link>
                                                </li>
                                            </ul>
                                            <Button onClick={addLike} variant={stylebtLike} startIcon={<ThumbUpIcon />}>
                                                Like
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="text">
                                    <p dangerouslySetInnerHTML={{__html: `${artical.content}`}} />
                                </div>

                                <div className="post-share-option clearfix">
                                    <div className="text pull-left">
                                        <h3>We Are Social On:</h3>
                                    </div>
                                    <ul className="social-links pull-right clearfix">
                                        <li>
                                            <Link to="/">
                                                <i className="fab fa-facebook-f" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/">
                                                <i className="fab fa-google-plus-g" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/">
                                                <i className="fab fa-twitter" />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="comment-box">
                                    <div className="group-title">
                                        <h2>{listComment.length} Bình luận</h2>
                                    </div>
                                    {listComment.map(c => <CommentItem key={c.id} comment={c} />)}
                                </div>
                                <div className="comments-form-area">
                                    <div className="group-title">
                                        <h2>Để lại bình luận</h2>
                                    </div>
                                    <div className="form-inner">
                                        <form id="contact-form" className="default-form" onSubmit={addComment}>
                                            <div className="row clearfix">
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <textarea placeholder="Nội dung" value={comment} 
                                                    onChange={(event) => setComment(event.target.value)}/>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                                                    <button className="theme-btn" type="submit" name="submit-form">
                                                        Gửi
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="blog-sidebar default-sidebar ml-20">
                                <div className="sidebar-widget sidebar-search">
                                    <div className="widget-title">
                                        <h3>Tìm kiếm</h3>
                                    </div>
                                    <form action="destination-details.html" method="post" className="search-form">
                                        <div className="form-group">
                                            <input type="search" name="search-field" placeholder="Nhập từ khóa" required/>
                                            <button type="submit">
                                                <i className="fas fa-search" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="sidebar-widget post-widget">
                                    <div className="widget-title">
                                        <h3>Tin mới nhất</h3>
                                    </div>
                                    <div className="post-inner">
                                        {lastestArticals.map(artical =>
                                            <div className="post" key={artical.id}>
                                                <figure className="post-thumb">
                                                    <Link to={"/artical-details/" + artical.id}>
                                                        <Avatar
                                                            alt="ImageComment"
                                                            src={artical.image}
                                                            sx={{ width: 90, height: 90 }}
                                                        />
                                                    </Link>
                                                </figure>
                                                <span className="post-date">{artical.created_date}</span>
                                                <h4 data-toggle="tooltip" title={artical.title}>
                                                    <Link to={"/artical-details/" + artical.id}>
                                                        {artical.title}
                                                    </Link>
                                                </h4>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="advice-widget">
                                    <div className="inner-box" style={{backgroundImage: `url(${advice1})`}}>
                                        <div className="text">
                                            <h2>
                                                Get <br />
                                                25% Off <br />
                                                On New York Tours
                                            </h2>
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
    );
}

export default ArticalDetails;

function CommentItem (props) {

        return (
            <div className="comment">
                <figure className="thumb-box">
                    <Avatar
                        alt="ImageComment"
                        src={props.comment.user.avatar}
                        sx={{ width: 52, height: 52 }}
                    />
                </figure>
                <div className="comment-inner">
                    <div className="comment-info clearfix">
                        <span className="post-date">{props.comment.created_date}</span>
                    </div>
                    <p>
                        {props.comment.content}
                    </p>
                    <div className="author-comment">
                        <span>Bình luận bởi:</span> {props.comment.user.username}
                    </div>
                </div>
            </div>
        )
    }
