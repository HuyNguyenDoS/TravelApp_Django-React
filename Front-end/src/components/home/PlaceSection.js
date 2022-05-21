import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import WOW from 'wowjs';

import animicon1 from "../../static/image/icon/anim-icon-1.png"
import shape3 from "../../static/image/shape/shape-3.png"
import place1 from "../../static/image/place/place-1.jpg"
import place2 from "../../static/image/place/place-2.jpg"
import place3 from "../../static/image/place/place-3.jpg"
import place4 from "../../static/image/place/place-4.jpg"

export default function PlaceSection() {
    useEffect(() => {
        new WOW.WOW({live: false}).init();
    }, [])
    return (
        <section className="place-section sec-pad">
            <div className="anim-icon">
                <div className="icon anim-icon-1" style={{ backgroundImage: `url(${animicon1})` }}/>
                <div className="icon anim-icon-2" style={{ backgroundImage: `url(${shape3})` }}/>
                <div className="icon anim-icon-3" style={{ backgroundImage: `url(${shape3})` }}/>
            </div>
            <div className="auto-container">
                <div className="row clearfix">
                    <div className="col-lg-4 col-md-6 col-sm-12 title-column">
                        <div className="sec-title">
                            <p>Chọn điểm đến của bạn</p>
                            <h2>Điểm đến phổ biến</h2>
                        </div>
                        <div className="text">
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 place-block">
                        <div className="place-block-one">
                            <div className="inner-box wow fadeInDown animated animated"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms">
                                <figure className="image-box">
                                    <img src={place1} alt="ImagePlace"/>
                                </figure>
                                <div className="text">
                                    <h3>
                                        <Link to="/tour-list">Phú Quốc</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 place-block">
                        <div className="place-block-one">
                            <div className="inner-box wow fadeInDown animated animated"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms">
                                <figure className="image-box">
                                    <img src={place2} alt="ImagePlace"/>
                                </figure>
                                <div className="text">
                                    <h3>
                                        <Link to="/tour-list">Vịnh Hạ Long</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 place-block">
                        <div className="place-block-one">
                            <div className="inner-box wow fadeInUp animated animated"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms">
                                <figure className="image-box">
                                    <img src={place3} alt="ImagePlace"/>
                                </figure>
                                <div className="text">
                                    <h3>
                                        <Link to="/tour-list">Nha Trang</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 place-block">
                        <div className="place-block-one">
                            <div className="inner-box wow fadeInUp animated animated"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms">
                                <figure className="image-box">
                                    <img src={place4} alt="ImagePlace"/>
                                </figure>
                                <div className="text">
                                    <h3>
                                        <Link to="/tour-list">Động Phong Nha</Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 link-column">
                        <div className="link-box centred wow fadeInRight animated animated"
                                    data-wow-delay="00ms"
                                    data-wow-duration="1500ms">
                            <h3>
                                Tìm Tất Cả <br />
                                Điểm Đến
                            </h3>
                            <Link to="/tour-list" className="theme-btn">
                                Tìm Ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}