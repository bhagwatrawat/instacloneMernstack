const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const messageSchema=new mongoose.Schema({

  message:{
    type:String,
  },
  senderId:{
    type:ObjectId,
    ref:"User"
  },
  participants:[{type:ObjectId,ref:"User"}]

},{timestamps:true})
const Message=mongoose.model('message',messageSchema)
module.exports= Message
