import React from "react";
import { Link } from "react-router-dom";

import shape11 from '../static/image/shape/shape-11.png'
import footerLogo from "../assets/img/travel.jpg";
import footerGallery1 from '../static/image/footer-gallery/footer-gallery-1.jpg'
import footerGallery2 from '../static/image/footer-gallery/footer-gallery-2.jpg'
import footerGallery3 from '../static/image/footer-gallery/footer-gallery-3.jpg'
import footerGallery4 from '../static/image/footer-gallery/footer-gallery-4.jpg'
import footerGallery5 from '../static/image/footer-gallery/footer-gallery-5.jpg'
import footerGallery6 from '../static/image/footer-gallery/footer-gallery-6.jpg'

export default function Footer() {
    return (
        <footer className="main-footer bg-color-2">
            <div className="footer-top pt-130">
                <div className="vector-bg" style={{ backgroundImage: `url(${shape11})` }}></div>
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                            <div className="footer-widget logo-widget">
                                <figure className="footer-logo">
                                    <Link to="/">
                                        <img src={footerLogo} alt="ImageLogo"/>
                                    </Link>
                                </figure>
                                <div className="text">
                                  
                                </div>
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
                                    <li>
                                        <Link to="/">
                                            <i className="fab fa-google-plus-g" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i className="fab fa-linkedin-in" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                            <div className="footer-widget links-widget">
                                <div className="widget-title">
                                    <h3>Dịch vụ</h3>
                                </div>
                                <div className="widget-content">
                                    <ul className="links-list clearfix">
                                        <li>
                                            <Link to="/about-us">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/tour-list">Tours</Link>
                                        </li>
                                        <li>
                                            <Link to="/blogs">Tin Tức</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Liên Lạc</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                            <div className="footer-widget gallery-widget">
                                <div className="widget-title">
                                    <h3>Kho ảnh</h3>
                                </div>
                                <div className="widget-content">
                                    <ul className="image-list clearfix">
                                        <li>
                                            <figure className="image-box">
                                                <Link to="/">
                                                    <img src={footerGallery1} alt="ImageFooter"/>
                                                </Link>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="image-box">
                                                <Link to="/">
                                                    <img src={footerGallery2} alt="ImageFooter"/>
                                                </Link>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="image-box">
                                                <Link to="/">
                                                    <img src={footerGallery3} alt="ImageFooter"/>
                                                </Link>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="image-box">
                                                <Link to="/">
                                                    <img src={footerGallery4} alt="ImageFooter"/>
                                                </Link>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="image-box">
                                                <Link to="/">
                                                    <img src={footerGallery5} alt="ImageFooter"/>
                                                </Link>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="image-box">
                                                <Link to="/">
                                                    <img src={footerGallery6} alt="ImageFooter"/>
                                                </Link>
                                            </figure>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
                            <div className="footer-widget contact-widget">
                                <div className="widget-title">
                                    <h3>Liên hệ</h3>
                                </div>
                                <div className="widget-content">
                                    <ul className="info-list clearfix">
                                        <li>
                                            <i className="fas fa-map-marker-alt" />
                                            371 Nguyễn Kiệm, quận Gò Vấp, Thành phố Hồ Chí Minh
                                        </li>
                                        <li>
                                            <i className="fas fa-microphone" />
                                            <Link to="tel:0354444899">0354444899</Link>
                                        </li>
                                        <li>
                                            <i className="fas fa-envelope" />
                                            <Link to="mailto:1851050006bang@ou.edu.vn">
                                               1951052134nguyen@ou.edu.vn
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="auto-container">
                    <div className="bottom-inner clearfix">
                        <div className="copyright pull-left">
                            <p>
                                <Link to="/">TravelTour</Link> © 2022 All Right Reserved
                            </p>
                        </div>
                        <ul className="footer-nav pull-right">
                            <li>
                                <Link to="/">Terms of Service</Link>
                            </li>
                            <li>
                                <Link to="/">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
