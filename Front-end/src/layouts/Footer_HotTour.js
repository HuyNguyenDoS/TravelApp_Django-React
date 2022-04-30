import React from 'react'
import { Card,Col,Row} from "react-bootstrap"

export default function Footer_HotTour() {
    return (
        <>
            <Row style={{backgroundColor:"white",padding:"10px"}}>
                <Card.Header className="text-center text-success" as="h1">ĐIỂM ĐẾN ĐANG HOT
                <div class="line">
                    <hr/>
                    </div>
                </Card.Header>
            </Row>

            <Row xs={{ cols: 1 }} md={{ cols: 3 }} className="g-4">
                <Col xs>
                    <Card className="h-100">
                        <Card.Img Img orientation="top" src="https://vnappmob.sgp1.cdn.digitaloceanspaces.com/soro/lolivi/1535173021-0B7B0CB9-0161-4953-BA83-7C7FB4146327.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to additional
                                content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs>
                    <Card className="h-100">
                        <Card.Img Img orientation="top" src="https://vnappmob.sgp1.cdn.digitaloceanspaces.com/soro/lolivi/1535173322-436CD541-5C19-4C27-98C2-FB68B31E270F.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This card has supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs>
                    <Card className="h-100">
                        <Card.Img Img orientation="top" src="https://vnappmob.sgp1.cdn.digitaloceanspaces.com/soro/lolivi/1535173142-35808367-33C0-4838-8EA2-26AEAF8CF7F0.jpg" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to additional
                                content. This card has even longer content than the first to show that equal height
                                action.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}