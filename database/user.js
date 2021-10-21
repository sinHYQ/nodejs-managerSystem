// 引入模块
let mongoose=require('mongoose');
// 引入连接的数据库
require('./db');
// 创建集合规则1
let hoaguSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'必须填写'],
        maxlength:[16,'用户名不能超过16位'],
        minlength:[2,'用户名至少4位'],
        trim:true
    },
    password:{
        type:String,
        required:[true,'必填项']
    },
    photo:{
        type:String
    },
    sex:{
      type:String,
      required:[true,'必须填写']
    },
    age:{
      type:Number,
      max:100,
      min:10
    },
    address:{
      type:String,
      required:[true,'必须填写']
    }
});
// 使用集合规则创建集合
let Users = mongoose.model("Users", hoaguSchema);
// 暴露
module.exports = {
    Users
};