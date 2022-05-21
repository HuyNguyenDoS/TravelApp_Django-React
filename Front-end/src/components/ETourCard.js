import React from 'react'
import { Card, Col } from 'react-bootstrap'
import {BiTime} from "react-icons/bi"
import {GiMoneyStack} from "react-icons/gi"
import { Link } from 'react-router-dom'
export default function ETourCard(props) {
    let path = `/tours/${props.obj.id}/`
  return (
      //Cho hiện danh sách tour
      <Col md={4} xs={12}>
          <Card>
            <Link to={path}>
               <img src={props.obj.imageTour} variant="top"  style={{width:'auto', height: '300px'}} />
            </Link> 
            <Card.Body>
                <Card.Title className='text-primary'>{props.obj.name_tour}</Card.Title>
                <Card.Text>
                  <BiTime/>  {props.obj.created_date}
                </Card.Text>
                <Card.Text>
                <GiMoneyStack/> {props.obj.price} vnd
                </Card.Text>
            </Card.Body>
          </Card>
      </Col>
   
  )
}
