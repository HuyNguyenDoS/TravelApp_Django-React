import React, { useEffect, useState } from 'react';
import API, { endpoints } from '../configs/Apis';
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import WOW from 'wowjs';
import { makeStyles } from "@mui/styles";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import pageTitle6 from "../static/image/background/page-title-6.jpg"
import advice1 from "../static/image/advice/advice-1.jpg"
import PreLoader from "../components/PreLoader"
import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({
    ul: {
        '& .css-ax94ij-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#ff7c5b',
        },
        '& .Mui-selected': {
            color: '#fff',
        },
    }
})
);

function Articals(props) {
    const classes = useStyles();
    let location = useLocation();
    const navigate = useNavigate();

    const [count, setCount] = useState(-1)
    const [listArtical, setListArtical] = useState([])
    const [lastestArticals, setLastestArticals] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1)

    useEffect(() => {
        new WOW.WOW({live: false}).init();
    }, [])

    useEffect(() => {
        let loadArticals = async () => {
            let query = location.search
            if (query === "")
                query = `?page=${page}`
            else
                query += `&page=${page}`

            try {
                let res = await API.get(`${endpoints['articals']}${query}`)
                console.log(res.data)

                setListArtical(res.data.results)
                setCount(res.data.count)
            } catch (error) {
                console.error(error)
            }
        }
        loadArticals()
    }, [location.search, page])

    const searchArtical = (event, search = `?q=${searchTerm}`) => {
        event.preventDefault()
        navigate(`/articals/?q=${searchTerm}`)
    }
    

    let articals = <></>

    if (listArtical.length !== 0) {
        articals = <>
            {listArtical.map(b => <ArticalItem key={b.id} artical={b} />)}
        </>
    }

    // Pagination
    const handlePageChange = (event, value) => {
        setPage(value);
      };

    let pages = <>
        <Stack spacing={2}>
            <Pagination
            classes={{ ul: classes.ul }}
            variant="outlined" 
            size="large" 
            count={Math.ceil(count / 5)}
            onChange={handlePageChange} />
        </Stack>
    </>

    if (listArtical.length === 0 && count === -1) {
        return <PreLoader />
    }

    return (
        <>
            <Header/>
            <section className="page-title centred" style={{ backgroundImage: `url(${pageTitle6})` }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <h1>Trang Tin Tức</h1>
                        <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                    </div>
                </div>
            </section>

            <section className="sidebar-page-container">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="blog-standard-content">
                                {articals}
                                <div className="pagination-wrapper">
                                    <ul className="pagination clearfix">
                                        {pages}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="blog-sidebar default-sidebar ml-20">
                                <div className="sidebar-widget sidebar-search">
                                    <div className="widget-title">
                                        <h3>Tìm kiếm</h3>
                                    </div>
                                    <form onSubmit={searchArtical} className="search-form">
                                        <div className="form-group">
                                            <input type="search" 
                                            placeholder="Nhập từ khóa"
                                            value={searchTerm}
                                            onChange={event => setSearchTerm(event.target.value)}
                                            />
                                            <button type="submit">
                                                <i className="fas fa-search" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="sidebar-widget category-widget">
                                    <div className="widget-title">
                                        <h3>Phân Loại</h3>
                                    </div>
                                    <div className="widget-content">
                                        <ul className="category-list clearfix">
                                            <li>
                                                <Link to="/artical-details/2">
                                                    <i className="fas fa-long-arrow-alt-right" />
                                                    Văn Hóa
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/artical-details/3">
                                                    <i className="fas fa-long-arrow-alt-right" />
                                                    Du Lịch
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/artical-details/4">
                                                    <i className="fas fa-long-arrow-alt-right" />
                                                    Kinh Nghiệm
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
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
                                                <h4>
                                                    <Link to={"/artical-details/" + artical.id} toggle="tooltip" title={artical.title}>
                                                        {artical.title}
                                                    </Link>
                                                </h4>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="advice-widget">
                                    <div
                                        className="inner-box"
                                        style={{
                                            backgroundImage: `url(${advice1})`
                                        }}
                                    >
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
        </>
    );
}

export default Articals;

function ArticalItem(props) {
     const componentDidMount= () => {
        new WOW.WOW({
            live: false
        }).init();
    }
        return (
            <>
                <div className="news-block-one wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                        <figure className="image-box">
                            <Link to={"/artical-details/" + props.artical.id}>
                                <img style={{width: "770px", height: "470px"}} src={props.artical.image} alt="ImageBlog"/>
                            </Link>
                            <span className="post-date">
                                <i className="far fa-calendar-alt" />
                                {props.artical.created_date}
                            </span>
                        </figure>
                        <div className="lower-content">
                            <div className="category">
                                <Link to={"/artical-details/" + props.artical.id}>Lifestyle</Link>
                            </div>
                            <h2>
                                <Link to={"/artical-details/" + props.artical.id}>
                                    {props.artical.title}
                                </Link>
                            </h2>
                            <ul className="post-info clearfix">
                                <li>
                                    <span>Theo</span> <Link to={"/artical-details/" + props.artical.id}>{props.artical.author}</Link>
                                </li>
                                <li> - {props.artical.created_date}</li>
                            </ul>
                            <div className="btn-box">
                                <Link to={"/artical-details/" + props.artical.id} className="theme-btn-two">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
