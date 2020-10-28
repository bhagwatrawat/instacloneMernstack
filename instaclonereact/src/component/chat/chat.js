import React from 'react';
import {Route,Switch} from 'react-router-dom'
import SideBar from './SideBar/SideBar'
import Messages from './Message/Messages'
import {IoIosSend} from 'react-icons/io'
import './chat.css'
const Chat =()=>{
  return (
    <div className="container-fluid pl-0 pr-0" >
      <div className=" _chat col-lg-8 offset-lg-2 pl-0 pr-0">
      <SideBar/>

        <Switch>
          <Route path="/chat" exact render={()=>{
           return(
              <div className="_hardCode" >
                <div>
                <IoIosSend size={200} />
                <div>Send msg to your following</div>
              </div>
            </div>
            )}}/>
          <Route path ='/chat/:id' component={Messages} />
        </Switch>


    </div>
    </div>
  )
}
export default Chat
