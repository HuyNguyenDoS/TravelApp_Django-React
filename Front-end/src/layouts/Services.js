import React from 'react'
import {FaMoneyCheck,FaDollarSign,FaUser} from 'react-icons/fa'
import {MdOutlineWifiTethering} from 'react-icons/md'
import {BsFillPhoneFill} from 'react-icons/bs'
import {AiFillLike} from 'react-icons/ai'

export default function Services() {
  
    return (
        <>
    <section id="services" class="services">
        <div class="container" data-aos="fade-up">

            <div class="section-title">
            <h2>Vì sao chọn TravelApp</h2>
            </div>

            <div class="row">
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
                <div class="icon"><i class="bi bi-chat-left-dots"><MdOutlineWifiTethering/></i></div>
                <h4 class="title">Mạng bán tour</h4>
                <p class="description">Đầu tiên tại Việt Nam</p>
                <p class="description">Ứng dụng công nghệ mới nhất</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                <div class="icon"><i class="bi bi-bounding-box"><AiFillLike/></i></div>
                <h4 class="title">Sản phẩm &amp; Dịch vụ</h4>
                <p class="description">Đa dạng – Chất lượng – An toàn</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                <div class="icon"><i class="bi bi-globe"><FaDollarSign/></i></div>
                <h4 class="title">Giá cả</h4>
                <p class="description">Luôn có mức giá tốt nhất</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                <div class="icon"><i class="bi bi-broadcast"><FaMoneyCheck  /></i></div>
                <h4 class="title">Thanh toán</h4>
                <p class="description">An toàn  &amp;  linh hoạt</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                <div class="icon"><i class="bi bi-brightness-high"><BsFillPhoneFill/></i></div>
                <h4 class="title">Đặt tour</h4>
                <p class="description">Dễ dàng &amp; nhanh chóng chỉ với 3 bước</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                <div class="icon"><i class="bi bi-calendar2-week"><FaUser/></i></div>
                <h4 class="title">Hỗ trợ</h4>
                <p class="description">Hotline &amp; trực tuyến (08h00 - 22h00)</p>
            </div>
            </div>

        </div>
    </section>
        </>
        )
}