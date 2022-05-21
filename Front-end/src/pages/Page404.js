import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WOW from 'wowjs';

export default function Page404(props) {
    useEffect(() => {
        new WOW.WOW({live: false}).init();
    }, [])
    
    return (
        <>
            <section className="error-section centred">
                <div className="auto-container">
                    <div className="inner-box wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <h1>404</h1>
                        <h2>Không tìm thấy trang. <br />Trang không tồn tại hoặc đã bị xóa</h2>
                        <Link to="/" className="theme-btn">Trở về trang chủ</Link>
                    </div>
                </div>
            </section>
        </>
    );
}