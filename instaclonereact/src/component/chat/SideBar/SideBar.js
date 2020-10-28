import React ,{useEffect,useState,useContext} from 'react'
import PersonChat from './PersonChat/PersonChat'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './SideBar.css'
import {Spinner} from 'reactstrap'
const SideBar = () => {
  const [followingList ,setFollowingList]=useState([])
  const [loader,setLoader] =useState(true)

  useEffect(()=>{
    axios.get('/followersList',{  headers: {

        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      }}).then(res =>{
        setFollowingList(res.data.following);
        setLoader(false)
      }).catch(err=>{
        console.log(err);
      })
  },[])

  return (
    <div className="_Sidebar">
      {loader?
      <div className="_blim">
      <Spinner className="mb-3" type="grow" color="primary" />
      <Spinner className="mb-3" type="grow" color="secondary" />
      <Spinner className="mb-3" type="grow" color="success" />
     </div>
    :
    <div>
    <h4 className="_Direct">Direct </h4>
    {followingList.length?
    followingList.map(item=>{

      return <Link to={"/chat/"+item._id} key={item._id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <PersonChat  item={item}/>
        </Link>

    })
    :
    <div>First follow users you want to msg </div>
    }
  </div>
}
    </div>
  )
}

export default SideBar
