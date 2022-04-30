import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import Apis, { endpoints } from '../configs/Apis'

import Moment from 'react-moment';
import { Button } from 'bootstrap';
import { useSelector } from 'react-redux';
import cookies from 'react-cookies';



export default function PostDetail() {
    const [tour, setTour] = useState(null)
    let { tourId } = useParams()
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState(null)
    // const [changed, setChanged] = useState(1)
    let user = useSelector(state => state.user.user)
  


    useEffect(() => {
      let loadTourDetail = async () => {
        try {
            let res = await Apis.get(endpoints['tour-detail'](tourId))
            
            setTour(res.data)
        } catch (err) {
            console.error(err)
        }
      }
      let loadComments = async () => {
        try {
            let res = await Apis.get(endpoints['comments'](tourId))
            setComments(res.data)
        }
        catch(err) {
            console.error(err)
          }
      }
        
      loadComments()
      loadTourDetail()
      
    }, [])

  const addComment = async (event) => {
    event.preventDefault()

    let loadTourDetail = async () => {
      try {
          let res = await Apis.get(endpoints['tour-detail'](tourId))
          
          setTour(res.data)
      } catch (err) {
          console.error(err)
      }
    }

    try {
        let res = await Apis.tour(endpoints['add-comment'](tourId), {
            'content': commentContent
        }, {
          headers: {
            'Authorization': `Bearer ${cookies.load('access_token')}`
          }
        })

        console.info(res.data)
        // comments.push(res.data)
        // setComments(comments)
        // setChanged(comments.length)
    } catch (err) {
      console.error(err)
    }
    return loadTourDetail()
  }

  if (tour === null)
    return <Spinner animation='border'/>
  
  let comment = <em><Link to='/login'> Đăng nhập </Link> để hình luận </em>
  if (user !== null && user !== undefined) {
      comment =  <Form onSubmit={addComment}>
                    <Form.Group className="mb-3" controlId="comentContent">
                      <Form.Control as="textarea"
                                    value={commentContent}
                                    onChange={(event) => setCommentContent(event.target.value)}
                                    placeholder='Nhập nội dung bình luận' rows={3} />
                    </Form.Group>
                    <button type='submit'>Thêm bình luận</button>
                </Form>
  }

  return (
    <>
    <Container>
      <h1 className='text-success'>TourDetail</h1>
      <Row>
            <Col md={4} xs={12}>
              <Image src={tour.image} style={{width:'417px', height: '557px'}} rounded fluid />
            </Col>
            <Col md={8} xs={12}>
              <h2>{tour.title}</h2>
              <p>Ngày tạo: {tour.created_date}</p>
              <p>Ngày cập nhật: {tour.updated_date}</p>
              <p>
                  {tour.tags.map(t => <Badge bg='secondary'>{t.name}</Badge>)}
              </p>
            </Col>
        </Row>
        <hr />
        <div>
           {tour.content}
        </div>
        {comments.map(c => 
               <div className="coment-area" >
               <ul className="we-comet">
                   <li>
                       <div className="comet-avatar">
                           <Image src={'http://127.0.0.1:8000/static' + c.creator.avatar} alt="" />
                       </div>
                       <div className="we-comment">
                           <div className="coment-head">
                               <h5><a  title="">{c.creator.username}</a></h5>
                               <span> {c.created_date} </span>
                               <a className="we-reply" title="Reply"><i className="fa fa-reply"></i></a>
                           </div>
                           <p>{c.content}</p>
                       </div>
                      
                   </li>
                   
               </ul>
           </div>
          
          )}
        {comment}
        <br></br>
        </Container>

    </>
  )
}
