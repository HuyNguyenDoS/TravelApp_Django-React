import Apis, { endpoints } from '../configs/Apis'
import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import cookies from 'react-cookies';
import { Button } from 'bootstrap';
import IndexNavbar from '../layouts/IndexNavbar';
import IndexHeader from '../layouts/IndexHeader';
import Rating from "react-rating";
import Moment from 'react-moment';

export default function TourDetail() {
  const [tour, setTour] = useState(null)
  let { tourId } = useParams()
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState(null)
  const [rating, setRating] = useState(0)
  const [changed, setChanged] = useState(1)
  let user = useSelector(state => state.user.user)
  

  useEffect(() => {
    let loadTourDetail = async () => {
      try {
          let res = await Apis.get(endpoints["tour-detail"](tourId), {
              headers: {
                  "Authorization": `Bearer ${cookies.load("access_token")}`
              }
          }
          )
          setTour(res.data)
          setRating(res.data.rate)
      } catch (err) {
          console.error(err)
      }
  }

    let loadComments = async () => {
          try {
              let res = await Apis.get(endpoints['comments'](tourId))
              setComments(res.data)
          } catch (err) {
              console.error(err)
          }
      }
      
    loadComments()
    loadTourDetail()
    
  }, [changed])


  const addComment = async (event) => {
    event.preventDefault()

    try {
        let res = await Apis.post(endpoints['add-comment'](tourId), {
            "content": commentContent
        }, {
            headers: {
                "Authorization": `Bearer ${cookies.load("access_token")}`
            }
        })

        console.info(res.data)
        comments.push(res.data)
        setComments(comments)
        setChanged(comments.length)
        setCommentContent('')
    } catch (err) {
        console.error(err)
    }

}

  const saveRating = async (rate) => {
    if (window.confirm("Ban muon danh gia bai hoc nay?") == true) {
        try {
            let res = await Apis.post(endpoints['rating'](tourId), {
                "rating": rate
            }, {
                headers: {
                    "Authorization": `Bearer ${cookies.load("access_token")}`
                }
            })
            console.info(res.data)
        } catch (err) {
            console.error(err)
        }
    }
}



if (tour === null)
  return <Spinner animation='border'/>

  let comment = <em><Link to='/login'> Đăng nhập </Link> để hình luận </em>
  let r = ""
  if (user !== null && user !== undefined) {
    comment =  <Form onSubmit={addComment} >
                  <Form.Group className="mb-3" controlId="comentContent">
                    <Form.Control as="textarea" 
                                  value={commentContent}
                                  onChange={(event) => setCommentContent(event.target.value)}
                                  placeholder='Nhập nội dung bình luận' rows={3}
                                   />
                  </Form.Group>
                  <button type='submit'>Thêm bình luận</button>
              </Form>
  r = <Rating  
      emptySymbol={<img src={require("../assets/img/star-empty.png")} className="icon" />}
      fullSymbol={<img src={require("../assets/img/star-yellow.png")} className="icon" />} 
      initialRating={rating} onClick={saveRating} 
    />
}

return (
  <>
    <IndexNavbar/>
    <IndexHeader/>
    <h1 className='text-success'>TourDetail</h1>
    <Row>
          <Col md={4} xs={12}>
            <Image src={tour.imageTour} style={{width:'500px', height: '557px'}} rounded fluid />
          </Col>
          <Col md={8} xs={12}>
            <h2>{tour.name_tour}</h2>
            <p>Ngày tạo: {tour.created_date}</p>
            <p>Ngày cập nhật: {tour.updated_date}</p>
            {/* <p>
                {tour.tags.map(t => <Badge bg='secondary'>{t.name}</Badge>)}
            </p> */}
            <p>
              {r}
            </p>
          </Col>
      </Row>
      <hr />
      {/* <div>
         {arrival.content}
      </div> */}
      {comment}
      <hr />
      {comments.map(c => <Row>
                                  <Col md={1} xs={3}>
                                      <Image  src={ c.creator.avatar} roundedCircle fluid />
                                      
                                  </Col>
                                  <Col md={11} xs={9}>
                                      <p><em>{c.content}</em></p>
                                      <p>Binh luan boi: {c.creator.username}</p>
                                      <p>Vao luc: <Moment fromNow>{c.created_date}</Moment></p>
                                  </Col>
                              </Row>)}
  </>
)
}