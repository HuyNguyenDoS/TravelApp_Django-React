import React from 'react';
import WOW from 'wowjs';
import Header from '../components/Header';
import shape2 from "../static/image/shape/shape-2.png"
import shape3 from "../static/image/shape/shape-3.png"
import shape12 from "../static/image/shape/shape-12.png"
import shape13 from "../static/image/shape/shape-13.png"
import team1 from "../assets/img/logo.png"
import video1 from "../static/image/background/video-1.jpg"
import about3 from "../static/image/about/about-3.jpg"
import { Link } from 'react-router-dom';

export default function About(props) {
    return (
        <>
             <Header/>
            <section className="page-title centred" style={{
              backgroundImage:
              "url(" + require("../assets/img/hallstatt-g22b586807_1920.jpg") + ")",
           }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated"
                                data-wow-delay="00ms"
                                data-wow-duration="1500ms">
                        <h1>Thông tin</h1>
                        <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                    </div>
                </div>
            </section>
            <AboutStyleTwoSection/>
            <AboutVideoSection/>
            <AboutTeamSection/>
        </>
    );
}

function AboutStyleTwoSection(props) {
    const componentDidMount  = () => {
        new WOW.WOW({
            live: false
        }).init();
    }
        return (

            <section className="about-style-two">
                <div
                    className="pattern-layer"
                    style={{
                        backgroundImage: `url(${shape2})`
                    }}
                />
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                            <div className="content_block_1">
                                <div className="content-box">
                                    <div className="sec-title wow fadeInLeft animated animated"
                                            data-wow-delay="00ms"
                                            data-wow-duration="1500ms">
                                        <p>Du lịch TravelTour</p>
                                        <h2>Công ty du lịch tốt nhất cả nước từ năm 2022.</h2>
                                    </div>
                                    <div className="text wow fadeInLeft animated animated"
                                            data-wow-delay="00ms"
                                            data-wow-duration="1500ms">
                                        <p>
                                        TravelTour là thương hiệu của Công ty TNHH Du Lịch và Dịch Vụ TravelTour. 
                                        TravelTour được đánh giá là một trong những thuơng hiệu có uy tín trong 
                                            các doanh nghiệp Lữ hành Quốc tế và Nội địa của Việt Nam.
                                        </p>
                                    </div>
                                    <div className="btn-box wow fadeInUp animated animated"
                                            data-wow-delay="00ms"
                                            data-wow-duration="1500ms">
                                        <Link to="/tour-list" className="theme-btn">
                                            Tìm hiểu
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                            <div className="image_block_2">
                                <div className="image-box wow fadeInRight animated animated"
                                        data-wow-delay="00ms"
                                        data-wow-duration="1500ms">
                                    <div className="shape">
                                        <div
                                            className="shape-1"
                                            style={{
                                                backgroundImage: `url(${shape13})`
                                            }}
                                        />
                                        <div
                                            className="shape-2"
                                            style={{
                                                backgroundImage: `url(${shape12})`
                                            }}
                                        />
                                        <div
                                            className="shape-3"
                                            style={{
                                                backgroundImage: `url(${shape12})`
                                            }}
                                        />
                                    </div>
                                    <figure className="image">
                                        <img src={about3} alt="ImageAbout"/>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

function AboutVideoSection() {
    const componentDidMount = () => {
        new WOW.WOW({
            live: false
        }).init();
    }
        return (
            <section
                className="video-section centred"
                style={{
                    backgroundImage: `url(${video1})`
                }}
            >
                <div className="auto-container">
                    <div className="inner-box">
                        <h2 className="wow fadeInDown animated animated"
                            data-wow-delay="00ms"
                            data-wow-duration="1500ms">
                                Khám phá chuyến du lịch của bạn
                        </h2>
                        <p className="wow fadeInDown animated animated"
                            data-wow-delay="00ms"
                            data-wow-duration="1500ms">
                                Ý tưởng du lịch mới của bạn
                        </p>
                        <div className="video-btn wow fadeInUp animated animated"
                                data-wow-delay="00ms"
                                data-wow-duration="1500ms">
                            <Link to="https://www.youtube.com/watch?v=uMJs-a-d2ug" className="lightbox-image" data-caption>
                                <i className="fas fa-play" />
                                <span className="border-animation border-1" />
                                <span className="border-animation border-2" />
                                <span className="border-animation border-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

function AboutTeamSection(){
     const componentDidMount = () => {
        new WOW.WOW({
            live: false
        }).init();
    }
        return (
            
            <section className="team-section sec-pad bg-color-1 centred">
                <div className="anim-icon">
                    <div
                        className="icon anim-icon-1"
                        style={{
                            backgroundImage: `url(${shape3})`
                        }}
                    />
                    <div
                        className="icon anim-icon-2"
                        style={{
                            backgroundImage: `url(${shape3})`
                        }}
                    />
                </div>
                <div className="auto-container">
                    <div className="sec-title">
                        <p>Hướng dẫn viên</p>
                        <h2>Các hướng dẫn viên</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-6 col-sm-12 team-block">
                            <div
                                className="team-block-one wow fadeInUp animated animated"
                                data-wow-delay="00ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src={team1} alt="ImageTeam" />
                                    </figure>
                                    <div className="lower-content">
                                        <h3>
                                            <Link to="/">Nhật Nguyên</Link>
                                        </h3>
                                        <span className="designation">Hướng dẫn viên</span>
                                        <ul className="social-links clearfix">
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-facebook-f" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-twitter" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-instagram" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 team-block">
                            <div
                                className="team-block-one wow fadeInUp animated animated"
                                data-wow-delay="300ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src={team1} alt="ImageTeam" />
                                    </figure>
                                    <div className="lower-content">
                                        <h3>
                                            <Link to="/">Huy Nguyên</Link>
                                        </h3>
                                        <span className="designation">Hướng dẫn viên</span>
                                        <ul className="social-links clearfix">
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-facebook-f" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-twitter" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-instagram" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 team-block">
                            <div
                                className="team-block-one wow fadeInUp animated animated"
                                data-wow-delay="600ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <figure className="image-box">
                                        <img src={team1} alt="ImageTeam" />
                                    </figure>
                                    <div className="lower-content">
                                        <h3>
                                            <Link to="/">Hữu Tiên</Link>
                                        </h3>
                                        <span className="designation">Hướng dẫn viên</span>
                                        <ul className="social-links clearfix">
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-facebook-f" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-twitter" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/">
                                                    <i className="fab fa-instagram" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
