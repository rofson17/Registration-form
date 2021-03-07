const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test_login",{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(()=>{
  console.log('conneting database successfull...');
}).catch((err)=>{
  console.log(e);
});
