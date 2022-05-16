import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button, ButtonGroup, Row} from "react-bootstrap";
import {GrNext,GrPrevious} from "react-icons/gr"
import Apis, { endpoints } from '../configs/Apis';
import { useLocation } from "react-router-dom"
import AdminArtical from '../layouts/AdminArtical';

const AddArtical = () => {

    let navigate = useNavigate();


    // const [imageTour, setImageTour] = useState(null)
    // const [name, setName] = useState(null)
    // const [price, setPrice] = useState(null)
    // const [address, setAddress] = useState(null)
    // const [phone, setPhone] = useState(null)
    
    const [topic, setTopic] = useState(null)
    const [content, setContent] = useState(null)
    const [imageArtical, setImageArtical] = useState(null)
    const [tours, setTours] = useState([])
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)
    const [page, setPage] = useState(1)
    const location = useLocation()

    useEffect(() => {
        let loadTours = async () => {
            let query = location.search 
            if (query === "")
                query = `?page=${page}`
            else
                query += `&page=${page}`
           try {
                let res = await Apis.get(`${endpoints['articals']}${query}`)
                setTours(res.data.results)

                setNext(res.data.next !== null)
                setPrev(res.data.previous !== null)
            } catch (err) {
                console.error(err)
            }   
        }

        loadTours()
    }, [location.search, page])

    const paging = (inc) => {
      setPage(page + inc)
    }
    const addNewTour = async () => {
        let formField = new FormData()
        // formField.append('name_tour',name)
        // formField.append('price',price)
        // formField.append('address',address)
        // formField.append('phone',phone)

        formField.append('topic',topic)
        formField.append('content',content)


        if(imageArtical !== null) {
          formField.append('image_Artical', imageArtical)
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
      <h1 style={{marginLeft:'500px'}}>Trang quản lý tin tức du lịch</h1>

      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Artical</h2>
        

        <div className="form-group">
        <label>Image</label>
             <input type="file" className="form-control" onChange={(e)=>setImageArtical(e.target.files[0])}/>
          </div>

          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div> */}
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Topic"
              name="name"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Content"
              name="name"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
         
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your address Name"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div> */}
          <button className="btn btn-primary btn-block" onClick={addNewTour}>
              Add Artical
          </button>
          </div>

        <Row  style={{marginTop:'50px'}}>
          {tours.map(c => <AdminArtical obj={c} />)}
      </Row>
      <ButtonGroup style={{display:"flex",justifyContent:"center",width:"10%",margin:"0 auto"}}>
          <Button variant="info"  onClick={() => paging(-1)} disabled={!prev}><GrPrevious/></Button>
          <Button variant="info" onClick={() => paging(1)} disabled={!next}><GrNext/></Button>
      </ButtonGroup>
      </>
        
    );
};

export default AddArtical;