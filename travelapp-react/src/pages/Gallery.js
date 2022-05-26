import React, { useEffect, useState } from "react";
import { useParams} from 'react-router-dom'
import WOW from 'wowjs';
import API, { endpoints } from '../configs/Apis';

import pageTitle from "../static/image/background/page-title.jpg"
import PreLoader from "../components/PreLoader"

export default function Gallery() {
    const [listImages, setListImages] = useState([])

    const {tourId} = useParams()
    useEffect(() => {
        new WOW.WOW({live: false}).init();
    }, [])

    useEffect(() => {
        let getImages = async () => {
            try {
                let res = await API.get(`${endpoints['tour-images']}?tour_id=${tourId}`)
                setListImages(res.data.results)
            } catch (error) {
                console.error(error)
            }
        }
        getImages()
    }, [tourId])

    if (listImages.length === 0) {
        return <PreLoader />
    }
    

    return (
        <>
            <section className="page-title centred" style={{ backgroundImage: `url(${pageTitle})` }}>
                <div className="auto-container">
                    <div className="content-box wow fadeInDown animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                        <h1>Bộ Sưu Tập</h1>
                        <p>Khám phá cuộc phiêu lưu tuyệt vời tiếp theo của bạn</p>
                    </div>
                </div>
            </section>

            <section className="gallery-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        {listImages.map(i => <ImageItem key={i.id} image={i} />)}
                    </div>
                </div>
            </section>
        </>
    );
}

function ImageItem () {
    const componentDidMount=()=> {
        new WOW.WOW({
            live: false
        }).init();
    }
        return (
            <>
                <div className="col-lg-4 col-md-6 col-sm-12 gallery-block wow fadeInUp animated animated"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms">
                    <div className="gallery-block-one">
                        <div className="inner-box">
                            <figure className="image-box">
                                <img src={props.image.image} alt="GalleryImage" />
                                <a href={props.image.image} className="view-btn lightbox-image" data-fancybox="gallery">
                                    {/* <i className="far fa-plus-square"></i> */}
                                </a>
                            </figure>
                        </div>
                    </div>
                </div>
            </>
        )
    }
