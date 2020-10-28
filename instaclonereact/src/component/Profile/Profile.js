import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import { Media,Button, Modal,Form,Input, ModalHeader,  Progress,ModalBody, ModalFooter } from 'reactstrap';
import {Avatar} from '@material-ui/core'
import YourPost from './YourPost/YourPost'
import {UserContext} from '../../reducer/reducer'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Spinner from '../spinner/spinner'
import './Profile.css'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

const Profile = (props) => {
  const [user,setUser]=useContext(UserContext)
  const [image,setImage]=useState()
  const [toggle,setToggle]=useState(false)
  const [loader,setLoader]=useState(true)
  const [myposts,setMyposts]=useState([])
  const [progress,setProgress]=useState(0)
  const [url,setUrl]=useState()
  const profileHandler=(e)=>{
    e.preventDefault()
    console.log('1')
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
      setToggle(false)
    })
    .catch(e=>{
      console.log(e)
    })
  }

  const deleteProfileHandler=()=>{
    const data={
      url:"https://bnpull-1195f.kxcdn.com/pub/media/magefan_blog/default-user.png"
    }
    axios.post("/deleteprofilePic",data,{
headers: {
  'Authorization': 'Bearer '+localStorage.getItem('jwt')
}
}).then(res=>{
  setToggle(false)
  localStorage.setItem("USER",JSON.stringify(res.data))
  setUser(res.data)
}).catch(err=>{
  console.log(err)
})

  }
  useEffect(()=>{
    if(url){
      const data={
        profileUrl:url,
      }
      axios.post("/profilePic",data,{
  headers: {
    'Authorization': 'Bearer '+localStorage.getItem('jwt')
  }
  }).then(res=>{

       localStorage.setItem("USER",JSON.stringify(res.data))
       setUser(res.data)
       setProgress(0)

      }).catch(e=>{

        console.log(e.response.data.error)
      })
    }
  },[url])
  useEffect(()=>{
    axios.get("/myposts",{
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res=>{

      setMyposts([...res.data])
      setLoader(false)
    })
  },[])
  const allposts=myposts.map(mypost=>{
    return <YourPost  key={mypost._id} id={mypost._id} src={mypost.photoUrl} />
  })
   const classes = useStyles();
  return <div>{
    toggle?(
      <div>

      <Modal modalClassName="_modal" isOpen={toggle} toggle={()=>setToggle(!toggle)}>
        <ModalHeader >Change Profile Photo</ModalHeader>
        <ModalBody>
        <Form>
          <div className="_upload">

            <Input type="file"   onChange={(e)=>setImage(e.target.files[0])} placeholder="Add your Post"  name="file"/>

          <Button color="primary" type="submit" onClick={(e)=>{profileHandler(e)}} >Upload</Button>
        </div>
        </Form>
         <Progress animated="animated" value={progress} max="100"/>
        </ModalBody>
        <ModalBody>
          <Button color="danger" onClick={deleteProfileHandler} >Delete Profile Photo </Button>{' '}

        </ModalBody>
        <ModalFooter>

         <Button color="secondary" onClick={()=>setToggle(!toggle)}>Cancel</Button>

        </ModalFooter>
      </Modal>
    </div>
  ):(<div></div>)}
    <div className="_profile container-fluid pl-0 pr-0">
      <div className="col-lg-8 offset-lg-2 pl-0 pr-0 ">
      {loader?<Spinner/>:<div>
         <div className="container-fluid">
       <div className="row ">
        <div className="col-md-7 offset-md-1 pl-0 pr-0">
    <Media>
      <Media left className=" mr-sm-5 pl-0">
        <Avatar onClick={()=>{setToggle(true)}}
          name="Bhagwat rawat" src={user.profileUrl} className={classes.large} />
        </Media>
        <Media body className="mt-5 ml-xl-5 ml-1">
        <Media heading>
        {user.name}
        </Media>
        <div className="d-flex justify-content-between">
        <button className="textbutton">{myposts.length} Posts</button>
        <button className="textbutton">{user.followers.length} followers</button>
        <button className="textbutton">{user.following.length} following</button>
        </div>
        </Media>
        </Media>
        </div>
        </div>
        <hr className="m-5"/>
      </div>
      <div className="_posts">
       {allposts}
      </div>
   </div>}
        </div>
        </div>



      </div>

}

export default Profile
