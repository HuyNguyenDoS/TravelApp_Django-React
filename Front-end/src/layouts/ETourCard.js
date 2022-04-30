import React from 'react'
import { Card, Col } from 'react-bootstrap'
import {BiTime} from "react-icons/bi"
export default function ECourseCard(props) {
  return (
   
      <Col md={4} xs={12}>
          <Card>
            <Card.Img style={{width:'auto', height: '300px'}}  variant="top" src={props.obj.image} />
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
