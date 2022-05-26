import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Apis, { endpoints } from '../configs/Apis'
import Admin from './Admin';
import cookies from "react-cookies"

const UpdateArtical = (props) => {

    let navigate = useNavigate();
    const { articalId } = useParams();
    
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [image, setImage] = useState(null)
    const [content, setContent] = useState(null)
    const [like, setLike] = useState(null)

    useEffect(() => {
      let loadArticalDetail = async () => {
        try {
            let res = await Apis.get(endpoints["artical-details"](articalId), 
            {
                headers: {
                    "Authorization": `Bearer ${cookies.load("access_token")}`
                }
            }
            )
            console.info(res.data)

            setTitle(res.data.title);
            setAuthor(res.data.content);
            setImage(res.data.image);
            setContent(res.data.content);
            setLike(res.data.like)
        } catch (err) {
            console.error(err)
        }
    }

      loadArticalDetail()
      
    }, [])


// Update s single student by id 

   const updateSingleTour= async () => {
        let formField = new FormData()

        formField.append('title',title)
        formField.append('author',author)
        formField.append('like',like)
        formField.append('content',content)


        if(image !== null) {
          formField.append('image', image)
        }

        //update bài viết
        if (window.confirm("Ban có chắc chắn sửa tin tức nay?") == true) {
          try {
            await axios({
                method: 'PUT',
                url: `http://127.0.0.1:8000/articals/${articalId}/`,
                data: formField
            }).then(response => {
                console.log(response.data);
                navigate("/admin");
            })
          } catch (err) {
          console.error(err)
          }
      }

    }


    return (
       <>
       <Admin/>
       <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <h2 className="text-center mb-4">Sửa một tin tức</h2>
            

            <div className="form-group">
              <img src={image} height="100" width="200" alt="" srcSet="" />
              <label>Thêm ảnh</label>
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
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Nhập like"
                  name="name"
                  value={like}
                  onChange={(e) => setLike(e.target.value)}
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
              <button onClick={updateSingleTour} className="btn btn-primary btn-block">Sửa một tin tức</button>
          
          </div>
        </div>
</>
    );
};

export default UpdateArtical;