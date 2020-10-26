import React,{useEffect,useState,useContext} from 'react'
import {Avatar} from '@material-ui/core'
import {Button,Input,Form} from 'reactstrap'
import {useParams} from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'
import {UserContext} from '../../../reducer/reducer'
import './Message.css'
 const Messages = () => {
  const [user,setUser]=useContext(UserContext)
  const [profile,setProfile]=useState('')
  const [textmsg,setTextmsg]=useState('')
  const [msgs,setMsgs]=useState([])
   const {id} =useParams()
   const [room,setRoom]=useState('')
   const [socket,setSocket]=useState()

const userId=user._id
  useEffect(()=>{
    if(!socket) return;
    socket.on('response',({room,textmsg})=>{
      console.log('response received')
      setMsgs(...msgs,{
        senderId:room,
        message:textmsg,
      })
    })
    return ()=>socket.off('response')
  },[socket])
  const sendMsgHandler=(e)=>{

     e.preventDefault();
     const data={
       senderId:user._id,
       receiverId:id,
       message:textmsg,
     }
     setTextmsg('')

     axios.post('/sendmsg',data,{  headers: {

         'Authorization': 'Bearer '+localStorage.getItem('jwt')
       }}).then(res=>{
          console.log(res.data)
          setMsgs([...msgs,res.data])

       }).catch(err=>{
         console.log(err)
       })
       socket.emit('sendmsg',({id,textmsg}))
       console.log('after sending msg')

   }
useEffect(()=>{
  const data={
    Id:id
  }

  axios.post('/chatwindow',data,{  headers: {

      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    }}).then(result=>{

      setProfile(result.data)
    }).catch(err=>{
      console.log(err)
    })
    axios.post('/getmsg',data,{  headers: {

        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      }}).then(result=>{
            setMsgs(result.data)
      }).catch(err=>{
        console.log(err)
      })

},[id])
useEffect(()=>{
  setSocket(io({query:{userId}}))
  console.log('here')
},[id])

  return (
    <div  className='_message'>
    <div className="_msg">
    <div className="_msgHeader">
      <Avatar className="ml-4" src={profile.profileUrl} />
      <div className="ml-3">{profile.name}</div>
    </div>
    <div className="_textBody ">
      {
        msgs.map(item=>{
          return <div className={item.senderId==id?"_receiver":"_sender"} key={item._id}>{item.message}</div>
        })
      }

      </div>

    </div>

      <Form>
        <div className="_text">
      <Input className="_inputtext"type="text" value={textmsg} onChange={(e)=>setTextmsg(e.target.value)} placeholder="text area..." name="comment" id="comment"/>
      <Button className="_buttontext" type="submit" onClick={(e)=>{sendMsgHandler(e)}}  color="none">Send</Button>
    </div>
    </Form>
    </div>
  )
}

export default Messages
