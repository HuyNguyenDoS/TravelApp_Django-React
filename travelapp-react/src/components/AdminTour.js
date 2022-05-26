import React from 'react'
import { Card, CardImg, Col } from 'react-bootstrap'
import {BiTime} from "react-icons/bi"
import {GiMoneyStack} from "react-icons/gi"
import { useState  } from "react";
import { useParams} from 'react-router';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function AdminArtical(props) {

    const [tour,setTour] = useState([])
    const navigate = useNavigate()

    //xóa bài viết
    const deleteUser = async () => {
        if (window.confirm("Bạn có chắc chắc xóa tin tức này?") == true) {
            try {
                await axios.delete(`http://127.0.0.1:8000/tours/${props.obj.id}/`)
                console.log('Ban da xoa thanh cong')
                navigate("/admin")
            } catch (err) {
                console.error(err)
            }
        }
    }

  return (
      //Cho hiện danh sách tour
      <Col md={4} xs={12}>
          <Card>
            <CardImg  src={props.obj.imageTour} variant="top"  style={{width:'auto', height: '300px'}}>
            </CardImg> 
            <Card.Body>
                <Card.Title className='text-primary'>{props.obj.title}</Card.Title>
                <Card.Text>
                  <BiTime/>  {props.obj.created_date}
                </Card.Text>
                <Card.Text>
                <GiMoneyStack/> {props.obj.description}
                </Card.Text>
                <Card.Link className="btn btn-danger" onClick={() => deleteUser(tour.tourId)}>
                    Delete
                </Card.Link>

            </Card.Body>
          </Card>
      </Col>
   
  )
}
