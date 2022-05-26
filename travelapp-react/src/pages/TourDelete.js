import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import {GrNext,GrPrevious} from "react-icons/gr"
import Apis, { endpoints } from '../configs/Apis';
import { useLocation } from "react-router-dom"
import AdminTour from '../components/AdminTour';
import Admin from './Admin';

const TourDelete = () => {

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
      <Admin/>
        <Row  style={{marginTop:'50px'}}>
          {tours.map(c => <AdminTour obj={c} />)}
        </Row>
        <ButtonGroup style={{display:"flex",justifyContent:"center",width:"10%",margin:"0 auto"}}>
          <Button variant="info"  onClick={() => paging(-1)} disabled={!prev}><GrPrevious/></Button>
          <Button variant="info" onClick={() => paging(1)} disabled={!next}><GrNext/></Button>
      </ButtonGroup>
      </>
    );
};

export default TourDelete;