
import React, { useRef , useState} from 'react';
import { Form , Button} from "react-bootstrap";
import Apis, { endpoints } from '../configs/Apis';
import { useNavigate } from 'react-router-dom';




export default function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const avatar = useRef()
    const navigate = useNavigate()

    
    const register = (event) => {
        event.preventDefault()
  
        let registerUser = async () => {
            let formData = new FormData()
            let fileInputElement=document.getElementById("uploadImage");
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("username", username)
            formData.append("avatar", avatar.current.files[0])

        
            try {
                await Apis.post(endpoints['register'], formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                
                navigate('/login')
            } catch (err) {
                console.error(err)
            }
          
        }

        if (password !== null && password === confirmPassword) {
            registerUser()
        }
    }

    return (
      <>
      <h1 className="text-center text-success">DANG KY NGUOI DUNG</h1>
      <Form onSubmit={register}>
          <RegisterForm id="firstName" label="First Name" 
                        type="text" value={firstName}
                        change={(event) => setFirstName(event.target.value)}  />
          <RegisterForm id="lastName" label="Last Name" 
                        type="text" value={lastName}
                        change={(event) => setLastName(event.target.value)}  />
          <RegisterForm id="email" label="Email" 
                        type="email" value={email}
                        change={(event) => setEmail(event.target.value)}  />
          <RegisterForm id="username" label="Username" 
                        type="text" value={username}
                        change={(event) => setUsername(event.target.value)}  />
          <RegisterForm id="password" label="Password" 
                        type="password" value={password}
                        change={(event) => setPassword(event.target.value)}  />
          <RegisterForm id="confirm" label="Confirm Password" 
                        type="password" value={confirmPassword}
                        change={(event) => setConfirmPassword(event.target.value)}  />              
          <Form.Group className="mb-3" controlId="avatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" ref={avatar} className="form-control" />
          </Form.Group>
          
            <Button variant="primary" type="submit">
              Dang ky
            </Button>
          </Form>
      </>
  )
}

function RegisterForm(props) {
  return (
  <Form.Group className="mb-3" controlId={props.id}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control type={props.type} 
                    value={props.value}
                    onChange={props.change} />
  </Form.Group>
)
} 


