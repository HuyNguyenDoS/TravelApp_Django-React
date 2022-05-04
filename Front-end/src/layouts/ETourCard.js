import React from 'react'
import { Card, Col } from 'react-bootstrap'
import {BiTime} from "react-icons/bi"
import { Link } from 'react-router-dom'
export default function ECourseCard(props) {
    let path = `/tours/${props.obj.id}/`
  return (
   
      <Col md={4} xs={12}>
          <Card>
            <Link to={path}>
               <img src={props.obj.imageTour} variant="top"  style={{width:'auto', height: '300px'}} />
            </Link> 
            {/* <Card.Img style={{width:'auto', height: '300px'}}  variant="top" src={props.obj.image} /> */}
            <Card.Body>
                <Card.Title className='text-primary'>{props.obj.name_tour}</Card.Title>
                <Card.Text>
                  <BiTime/>  {props.obj.created_date}
                </Card.Text>
                {/* <Card.Text>
                  {props.obj.content}
                </Card.Text> */}
            </Card.Body>
          </Card>
      </Col>
   
  )
}
