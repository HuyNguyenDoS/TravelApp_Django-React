import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Apis, { endpoints } from '../configs/Apis'

const UpdateTour = (props) => {

    let navigate = useNavigate();
    const { articalId } = useParams();
    
    // const [image, setImage] = useState(null)
    // const [name, setName] = useState(null)
    // const [price, setPrice] = useState(null)
    // const [address, setAddress] = useState(null)
    // const [phone, setPhone] = useState(null)

    const [topic, setTopic] = useState(null)
    const [content, setContent] = useState(null)
    const [imageArtical, setImageArtical] = useState(null)

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
            console.log(res.data.topic);

            console.info(res.data)
            setTopic(res.data.topic);
            setContent(res.data.content);
            setImageArtical(res.data.image_Artical);
        } catch (err) {
            console.error(err)
        }
    }

      loadArticalDetail()
      
    }, [])

    // load students by its is and show data to forms by value

  //  let loadTours = async () => {
  //   const result = await axios.get(`http://127.0.0.1:8000/articals/${props.obj.id}`);
  //   console.log(result.data.topic);

    // setImage(result.data.imageTour);
    // setName(result.data.name_tour);
    // setPrice(result.data.price);
    // setPhone(result.data.phone);
    // setAddress(result.data.address);

  //   setTopic(result.data.topic);
  //   setContent(result.data.content);
  //   setImageArtical(result.data.imageArtical);
  //  }


// Update s single student by id 

   const updateSingleTour= async () => {
        let formField = new FormData()

        // formField.append('name',name)
        // formField.append('price',price)
        // formField.append('address',address)
        // formField.append('phone',phone)

        formField.append('topic',topic)
        formField.append('content',content)


        // if(image !== null) {
        //   formField.append('image', image)
        // }

        if(imageArtical !== null) {
          formField.append('image_Artical', imageArtical)
        }

        //update bài viết
        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/articals/${articalId}/`,
            data: formField
        }).then(response => {
            console.log(response.data);
            navigate("/admin");
        })

    }



    

    return (
       
        <div className="container">
  <div className="w-75 mx-auto shadow p-5">
    <h2 className="text-center mb-4">Update A Tour</h2>
    

    <div className="form-group">
      <img src={imageArtical} height="100" width="200" alt="" srcSet="" />
      <label>Upload Image</label>
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
      </div>
     
      <div className="form-group">
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
      <button onClick={updateSingleTour} className="btn btn-primary btn-block">Update Tour</button>
   
  </div>
</div>

    );
};

export default UpdateTour;