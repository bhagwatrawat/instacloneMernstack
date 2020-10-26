import React from 'react';
import {Route,Switch} from 'react-router-dom'
import SideBar from './SideBar/SideBar'
import Messages from './Message/Messages'
import './chat.css'
const Chat =()=>{
  return (
    <div className="container-fluid pl-0 pr-0" >
      <div className=" _chat col-lg-8 offset-lg-2 pl-0 pr-0">
      <SideBar/>
      <Switch>
        <Route path ='/chat/:id' component={Messages} />
      </Switch>
    </div>
    </div>
  )
}
export default Chat
