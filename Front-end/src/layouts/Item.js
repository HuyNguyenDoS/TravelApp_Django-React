import React from 'react'
import { Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Item = (props) => {
    const nav = useNavigate()

    const goToTour = () => {
        if (props.isTour === true)
            nav(`/lessons/${props.id}`)
        else
            nav(`/tours`)
    }

    let btnDetail = "Xem cac bai hoc"
    if (props.isTour === true)
        btnDetail = "Xem chi tiet"

    return (
        <Col md={4} xs={12}>
            <Card>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.subject}</Card.Title>
                    <Button variant="primary" onClick={goToTour}>{btnDetail}</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item