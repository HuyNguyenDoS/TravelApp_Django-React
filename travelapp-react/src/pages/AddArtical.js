import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import {GrNext,GrPrevious} from "react-icons/gr"
import Apis, { endpoints } from '../configs/Apis';
import { useLocation } from "react-router-dom"
import AdminArtical from '../components/AdminArtical';
import Admin from './Admin';

const AddArtical = () => {

    let navigate = useNavigate();

    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [image, setImage] = useState(null)
    const [content, setContent] = useState(null)
    const [like, setLike] = useState(null)

    const [articals, setArticals] = useState([])
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    const location = useLocation()

    useEffect(() => {
        let loadArticals = async () => {
            let query = location.search 
            if (query === "")
                query = `?page=${page}`
            else
                query += `&page=${page}`
           try {
                let res = await Apis.get(`${endpoints['articals']}${query}`)
                setArticals(res.data.results)

                setNext(res.data.next !== null)
                setPrev(res.data.previous !== null)
            } catch (err) {
                console.error(err)
            }   
        }

        loadArticals()
    }, [location.search, page])

    const paging = (inc) => {
      setPage(page + inc)
    }

    const addNewArtical = async () => {
        let formField = new FormData()

        formField.append('title',title)
        formField.append('author',author)
        formField.append('content',content)
        formField.append('likes',like)

        if(image !== null) {
          formField.append('image', image)
        }

        //thêm bài viết
        await axios({
          method: 'post',
          url:'http://localhost:8000/articals/',
          data: formField
        }).then(response=>{
          console.log(response.data);
          navigate('/admin')
        })
    }
    

    return (
      <>
      <Admin/>
      <h1 style={{marginLeft:'500px'}}>Trang quản lý tin tức du lịch</h1>

      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Thêm một tin tức</h2>
        

        <div className="form-group">
            <label>Image</label>
                <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tiêu đề"
              name="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tác giả"
              name="name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập nội dung"
              name="name"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
         
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập like"
              name="name"
              value={like}
              onChange={(e) => setLike(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-block" onClick={addNewArtical}>
              Thêm tin tức
          </button>
          </div>

        <Row  style={{marginTop:'50px'}}>
          {articals.map(c => <AdminArtical obj={c} />)}
        </Row>
      <ButtonGroup style={{display:"flex",justifyContent:"center",width:"10%",margin:"0 auto"}}>
          <Button variant="info"  onClick={() => paging(-1)} disabled={!prev}><GrPrevious/></Button>
          <Button variant="info" onClick={() => paging(1)} disabled={!next}><GrNext/></Button>
      </ButtonGroup>
      </>
    );
};

export default AddArtical;