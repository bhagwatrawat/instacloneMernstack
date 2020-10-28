import React ,{useState} from 'react'
import {MdDelete} from 'react-icons/md'
import axios from 'axios'

import './YourPost.css'
const YourPost = (props) => {
  const [exclude,setExclude] =useState(false)
  const deletepostHandler=()=>{

    const data={
      id:props.id
    }
    axios.post('/deletepost',data,{
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res=>{
      setExclude(true)

    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    exclude?
    <div></div>
    :
     <div className="_item">
       <img className="_images" src={props.src} alt="mypost"/>
         <MdDelete onClick={deletepostHandler}  className="overlay" size={30} />
     </div>

  )
}

export default YourPost
