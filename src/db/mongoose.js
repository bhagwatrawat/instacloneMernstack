const mongoose=require('mongoose')
const {MONGOURI}=require('../config/keys.js')
mongoose.connect (MONGOURI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
