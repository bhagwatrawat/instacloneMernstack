import React,{useState,useEffect} from 'react'
import {Button,Alert,Input,FormGroup,Label,Form,Progress} from 'reactstrap'
import { Card, CardHeader, CardFooter, CardBody,
 } from 'reactstrap';
import axios from 'axios'
import './createPost.css'
const CreatePost = (props) => {

  const [caption,setCaption]=useState('')
  const [image,setImage]=useState('')
  const [url,setUrl]=useState('')
  const [posted,setPosted]=useState(false)
  const [error,setError]=useState()
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    if(url){
      const data={
        photoUrl:url,
        caption:caption
      }
      axios.post("/post",data,{
  headers: {
    'Authorization': 'Bearer '+localStorage.getItem('jwt')
  }
  }).then(res=>{

        setProgress(0)
        setPosted(true)
        setImage('')
        setCaption('')

      }).catch(e=>{
        console.log(e)
        setError(e.response.data.error)
      })
    }
  },[url])
  const postDetails=(e)=>{
    e.preventDefault()

    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","instaclone")
    data.append("clound_name","bhagwat12uk")
    const options={
      onUploadProgress:(progressEvent)=>{
        const {loaded,total}=progressEvent;
        let percent=Math.floor((loaded*100)/total)
        console.log(loaded,total)
        console.log(percent)
        setProgress(percent)
      }
    }
    axios.post(" https://api.cloudinary.com/v1_1/bhagwat12uk/image/upload",data,options)
    .then(res=>{
      setUrl(res.data.url)
    })
    .catch(e=>{
      console.log(e)
    })
  }

  return (
    <div className="createPost col-lg-8 offset-lg-2">

      <Form>


      <Card>
          <CardHeader>  {posted?<Alert color="success">
              <div>Post created succesfully</div>
            </Alert>:null}
            {error?<Alert color="danger">
              <div>{error}</div>
            </Alert>:null}</CardHeader>
          <CardBody>
            <Input type="file"   onChange={(e)=>setImage(e.target.files[0])} placeholder="Add your Post"  name="file"/>
            <FormGroup>
                <Label for="caption">Add Caption</Label>
                <Input type="text" value={caption} onChange={(e)=>setCaption(e.target.value)} name="Caption" id="caption" placeholder="Caption" />
              </FormGroup>
            <Button type="submit" disabled={image?false:true} onClick={postDetails}>Post</Button>

          </CardBody>
          <CardFooter>  <Progress animated="animated" value={progress} max="100"/></CardFooter>
        </Card>

  </Form>
    </div>
  )
}

export default CreatePost
