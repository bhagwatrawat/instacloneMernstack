import React,{useEffect,useState,useContext,useRef} from 'react'
import {Avatar} from '@material-ui/core'
import {Button,Input,Form} from 'reactstrap'
import Spinner from '../../spinner/spinner'
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
   const messagesEndRef = useRef(null)
   const [loader, setLoader]=useState(true)

const userId=user._id
  useEffect(()=>{
    if(!socket) return;
    socket.on('response',({senderId,textmsg})=>{
      console.log('response received')
      console.log(msgs)
      setMsgs(prevState=>{
        return [...prevState,  { senderId:senderId,
          _id:Math.random(),
          message:textmsg}]
      })
    })
    return ()=>socket.off('response')
  },[socket])

  useEffect(()=>{
    if(!messagesEndRef.current) return
     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  },[msgs])

  const sendMsgHandler=(e)=>{
    const senderId=user._id
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
       socket.emit('sendmsg',{senderId,textmsg})
       console.log(senderId)

   }
useEffect(()=>{
  setLoader(true)
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
             setLoader(false)
            setMsgs(result.data)

      }).catch(err=>{
        console.log(err)
      })

},[id])

useEffect(()=>{
  setSocket(io({query:{id}}))
  console.log('here')
},[id])

  return (
  loader ? <div  className='_Spin'><Spinner /></div> :
    <div className="_message">

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
      <div ref={messagesEndRef} />
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
