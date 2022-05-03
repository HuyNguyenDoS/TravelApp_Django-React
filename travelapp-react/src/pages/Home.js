import React from 'react';
import { useEffect, useState } from "react"
import { Button, ButtonGroup, Row, Spinner } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import Apis, { endpoints } from "../configs/Apis"
import IndexHeader from '../layouts/IndexHeader';
import Footer_HotTour from '../layouts/Footer_HotTour';
import Service from '../layouts/Service';
import Footer from '../layouts/Footer';
import ScrollToTop from '../layouts/ScrollToTop';
import Body_Info from '../layouts/Body_Info';
import Tour from './Tour';
import ETourCard from '../layouts/ETourCard';
import {GrNext,GrPrevious} from "react-icons/gr"

export default function Home() {
    const [tours, setTours] = useState([])
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    const location = useLocation()

    useEffect(() => {
        let loadTours = async () => {
            let query = location.search 
            if (query === "")
                query = `?page=${page}`
            else
                query += `&page=${page}`
           try {
                let res = await Apis.get(`${endpoints['tours']}${query}`)
                setTours(res.data.results)

                setNext(res.data.next !== null)
                setPrev(res.data.previous !== null)
            } catch (err) {
                console.error(err)
            }   
        }

        loadTours()
    }, [location.search, page])

    const paging = (inc) => {
        setPage(page + inc)
    }


    return (
        <>
            <IndexHeader />
            <h1 class="text-center text-danger" style={{padding:"20px"}} >DANH MỤC CHUYẾN ĐI</h1>
            {/* <Row>
                {tours.map(c => <ETourCard obj={c} />)}
            </Row> */}
            <ButtonGroup style={{display:"flex",justifyContent:"center",width:"10%",margin:"0 auto"}}>
                <Button variant="info"  onClick={() => paging(-1)} disabled={!prev}><GrPrevious/></Button>
                <Button variant="info" onClick={() => paging(1)} disabled={!next}><GrNext/></Button>
            </ButtonGroup>
            <Footer_HotTour />
                <h1>DANH MUC CAC TOUR</h1>
                <Body_Info />
                <Service />
                <Footer />
                <ScrollToTop />
        </>
    )
}