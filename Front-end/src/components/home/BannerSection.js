import React, { useEffect } from "react";
import WOW from 'wowjs';

import banner2 from "../../static/image/banner/banner-2.jpg"
import shape1 from "../../static/image/shape/shape-1.png"

export default function BannerSection(props) {
    useEffect(() => {
        new WOW.WOW({live: false}).init();
    }, [])

    return (
        <>
            <section className="banner-section" style={{ backgroundImage: `url(${banner2})` }}>
                  <div className="pattern-layer" style={{ backgroundImage: `url(${shape1})` }}/>
                  <div className="auto-container">
                      <div className="content-box wow fadeInDown animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                          <h2>
                              Khám Phá <br />
                              Chuyến Du Lịch Của Bạn
                          </h2>
                          <p>
                              Hành trình khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn
                              đã bắt đầu!
                          </p>
                      </div>
                  </div>
              </section>
        </>
    )
} 
