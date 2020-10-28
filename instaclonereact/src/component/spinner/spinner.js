import React from 'react'
import {Spinner} from 'reactstrap'
import './spinner.css'
const Spin = (props) => {
  return (
    <div  className="_spinner" >
    <Spinner style={{ width: '3rem', height: '3rem'}} />
    </div>
  )
}

export default Spin
