import React from 'react'
import PropTypes from 'prop-types'
import {Avatar} from '@material-ui/core'
import './PersonChat.css'

const PersonChat = (props) => {
  return (
    <div className="_PersonChat">
    <div><Avatar src={props.item.profileUrl}/></div>
    <div className="ml-3">
    <div>{props.item.name}</div>
    <div>last message</div>
    </div>
    </div>
  )
}

export default PersonChat
