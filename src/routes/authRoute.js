const express = require('express')
const mongoose = require('mongoose')
const Post =require('../models/post')
const User=require('../models/auth')
const Message =require('../models/message')
const Middleware=require('../Middleware/authMiddleware')
const router=express.Router()

router.get('/myposts',Middleware,(req,res)=>{
  Post.find({UserId:req.user._id}).populate("UserId","_id name")
  .sort('-createdAt')
  .then(result=>{
    res.send(result)
  }).catch(e=>{
    res.send(e)
  })
})
router.post('/getmsg',Middleware,(req,res)=>{
  Message.find({participants:{$all:[req.user._id,req.body.Id]}})
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    res.send(err)
  })
})
router.post('/deletepost',Middleware,(req,res)=>{
  Post.findByIdAndDelete(req.body.id).then(result=>{
    res.send(result)
  }).catch(err=>{
    res.status(402).send(err)
  })
})
router.post('/sendmsg',Middleware,(req,res)=>{
  const messageResult={
    message:req.body.message,
    senderId:req.body.senderId,
    participants:[req.body.senderId,req.body.receiverId]
  }
  const message = new Message(messageResult)
  message.save().then(user => {
    res.send(user)
  }).catch(e => {
    res.send(e.message)
  })

})
router.post('/chatwindow',Middleware,(req,res)=>{
  User.findById(req.body.Id).select("_id name profileUrl")
  .then(result=>{
    res.send(result)
  }).catch(err=>{
    res.send(err)
  })
})
router.post('/search-users',Middleware,(req,res)=>{
  let userPattern= new RegExp("^"+req.body.query)
  User.find({name:{$regex:userPattern}})
  .select("_id name profileUrl")
  .then(result=>{
    res.send(result)
  }).catch(er=>{
    res.send(er)
  })
})
router.get('/allpost',Middleware,(req,res)=>{
  Post.find()
  .populate("UserId","_id name profileUrl")
  .populate("comments.postedBy",'_id name')
  .sort('-createdAt')
  .then(post=>{
    res.send(post)
  }).catch(e=>{
    res.status(500).send(e)
  })
})
router.get('/subpost',Middleware,(req,res)=>{

  Post.find({UserId:{$in:req.user.following}})
  .populate("UserId","_id name profileUrl")
  .populate("comments.postedBy",'_id name')
  .sort('-createdAt')
  .then(post=>{
    res.send(post)

  }).catch(e=>{
    res.status(500).send(e)
  })
})

router.post('/post',Middleware,(req,res)=>{
  const {caption,photoUrl}=req.body
  if(!photoUrl){
    return res.status(422).json({error:"Post is required"})
  }

  req.user.password=undefined
  const userPost=new Post({
    photoUrl,
    caption,
    UserId:req.user
  })
  userPost.save().then(result=>{
    res.status(201).json({post:result})
  }
  ).catch(e=>{
    res.status(500).send(e)
  })


})
router.get('/followersList',Middleware,(req,res)=>{
  User.findById(req.user._id).populate("following","_id name profileUrl")
  .then(result=>{
    res.status(200).send(result)
  })
  .catch(err=>{
    res.status(501).send(err)
  })
})
router.put('/like',Middleware,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
  },{
    new:true
     }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:"err"})
    }
    return res.status(201).send(result)
  })
})
router.put('/unlike',Middleware,(req,res)=>{
  Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
  },{
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    return res.status(201).send(result)
  })
})
router.put('/comment',Middleware,(req,res)=>{
  const data={
    text:req.body.text,
    postedBy:req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{comments:data}
  },{
    new:true
  }
).populate("comments.postedBy","_id name")
.exec ((err,result)=>{
  if(err){
    return res.status(422).json({error:"err"})
  }
  return res.status(201).send(result)
})
})
module.exports=router
