import React, { useEffect, useState ,useRef } from 'react'
import { Badge, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import Apis, { endpoints } from '../configs/Apis'
import Moment from 'react-moment';
import { Button } from 'bootstrap';
import { useSelector } from 'react-redux';
import cookies from 'react-cookies';
import IndexNavbar from '../layouts/IndexNavbar';
import IndexHeader from '../layouts/IndexHeader';
import Rating from "react-rating"

//Xu
export default function ArticalDetail() {
    const [artical, setArtical] = useState(null)
    let { articalId } = useParams()
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState(null)
    const [changed, setChanged] = useState(1)
    let user = useSelector(state => state.user.user)
    

    useEffect(() => {
      let loadArticalDetail = async () => {
        try {
            let res = await Apis.get(endpoints["artical-detail"](articalId), 
            // {
            //     headers: {
            //         "Authorization": `Bearer ${cookies.load("access_token")}`
            //     }
            // }
            )
            setArtical(res.data)
            console.info(res.data)
        } catch (err) {
            console.error(err)
        }
    }

      let loadComments = async () => {
            try {
                let res = await Apis.get(endpoints['comments'](articalId))
                setComments(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        
      loadComments()
      loadArticalDetail()
      
    }, [changed])


    const addComment = async (event) => {
      event.preventDefault()

      try {
          let res = await Apis.post(endpoints['add-comment'](articalId), {
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


  if (artical === null)
    return <Spinner animation='border'/>
  
    let comment = <em><Link to='/login'> Đăng nhập </Link> để hình luận </em>
    if (user !== null && user !== undefined) {
      comment =  <Form onSubmit={addComment} >
                    <Form.Group className="mb-3" controlId="comentContent">
                      <Form.Control as="textarea" 
                                    value={commentContent}
                                    onChange={(event) => setCommentContent(event.target.value)}
                                    placeholder='Nhập nội dung bình luận' rows={3}
                                     />
                    </Form.Group>
                    <button type='submit'variant="info">Thêm bình luận</button>
                </Form>
  }

  return (
    <>
      <IndexNavbar/>
      <IndexHeader/>
      <h1 className='text-success'>ArticalDetail</h1>
      <Row>
            <Col md={4} xs={12}>
              <Image src={artical.image_Artical} style={{width:'500px', height: '557px'}} rounded fluid />
            </Col>
            <Col md={8} xs={12}>
              <h2>{artical.topic}</h2>
              <p>Ngày tạo: {artical.created_date}</p>
              <p>Ngày cập nhật: {artical.updated_date}</p>
              <p>{artical.content}</p>
            </Col>
        </Row>
        <hr />
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
