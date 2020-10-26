const express=require('express')
const mongoose=require('mongoose')
const http =require('http')
require('./db/mongoose')
const UserRoute=require('./routes/userRoute')
const socketio=require('socket.io')
const authRoute=require('./routes/authRoute')
const otherUserRoute=require('./routes/otherUserRoute')
const app=express()
const PORT= process.env.PORT || 5000
const server=http.createServer(app)
const io=socketio(server)
app.use(express.json())
app.use(authRoute)
app.use(UserRoute)
app.use(otherUserRoute)

io.on('connection',(socket)=>{
  room=socket.handshake.query.userId
  socket.join(room)
  console.log(room)
  console.log('connnection made')
  socket.on('sendmsg',({id, textmsg})=>{
    console.log('message sent',textmsg,id)
    io.to(id).emit('response',{room,textmsg})
  })
})

if(process.env.NODE_ENV=="production"){
  app.use(express.static('instaclonereact/build'))
  const path=require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'instaclonereact','build','index.html'))
  })
}
server.listen(PORT,()=>{
  console.log("sever is running on port "+PORT)
})
