import React ,{useState,useContext,useEffect} from 'react'
import './Signin.css'
import logo from '../../Image/logo.png'
import { Button, Form, FormGroup,  Input,Alert,Toast,ToastBody,Spinner } from 'reactstrap'

import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../../reducer/reducer'



const Signin = (props) => {
  const [user,setUser]=useContext(UserContext)

  const history=useHistory()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const [toast,setToast]=useState(false)
  const [spin,setSpin]=useState(false)

useEffect(() => {
  const x =(props.location && props.location.state) || {};
  
  if(x.toast){
    

    setToast(x.toast)
  }
 
}, [])  
  const signInHandler=(e)=>{
    e.preventDefault()
    setSpin(true)
    const data={
      email:email,
      password:password
    }
    axios.post('/signin',data).then(res=>{


      localStorage.setItem("jwt",res.data.token)
      localStorage.setItem("USER",JSON.stringify(res.data.user))
      setUser(res.data.user)
      setSpin(false)
      history.push('/')
    }).catch(e=>{
      setSpin(false)
      setError(e.response.data.error)
    })
  }
  let alert=null
  if(error){
    alert=(
      <Alert color="danger">
        {error}
      </Alert>
    )
  }
  return (
    <div className=" _colHeading container-fluid pl-0 pr-0">
     
    <div className="_colSub col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-lg-3 offset-lg-4 pl-0 pr-0 pl-md-4 pr-md-4 ">

    <Form className="_thisform p-3" >


      <div className="_logoDiv">
        <img className="_logo" src={logo} alt="instagram" />
      </div>
      <Toast isOpen={toast} className="_toast" >
          <ToastBody icon="success" color="success">
            Account created successfully
          </ToastBody>
        </Toast>
      {alert}
      <FormGroup className="mt-4 ">

        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          name="email" id="email" placeholder="Email"  />

      </FormGroup>
      <FormGroup>

        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
          name="password" id="Password" placeholder="Password"  />
      </FormGroup>
       <Button className="_button" onClick={signInHandler} type="submit" outline color="primary">{spin ? <Spinner size="15px" color="info" />:<div>Log In</div>}</Button>
       <div className="_underline mt-5 mb-5"><span>OR</span></div>
       
       <div style={{textAlign:'center'}}>Dont have an account ?<Link to='/signup'> SignUp</Link></div>
      </Form>
    </div >
    </div>
  )
}

export default Signin
