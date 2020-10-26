import React ,{useEffect,useState,useContext} from 'react'
import PersonChat from './PersonChat/PersonChat'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './SideBar.css'
const SideBar = () => {
  const [followingList ,setFollowingList]=useState([])

  useEffect(()=>{
    axios.get('/followersList',{  headers: {

        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      }}).then(res =>{
        setFollowingList(res.data.following);
      }).catch(err=>{
        console.log(err);
      })
  },[])

  return (
    <div className="_Sidebar">
    <h4 className="_Direct">Direct </h4>
    {followingList.map(item=>{

      return <Link to={"/chat/"+item._id} key={item._id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <PersonChat  item={item}/>
        </Link>

    })}
    </div>
  )
}

export default SideBar
