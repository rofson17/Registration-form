const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  gender:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  conformPassword:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});

const Registar= new mongoose.model("Registar", userSchema);
module.exports= Registar;
