// 引入模块
let mongoose = require("mongoose");
// 引入连接的数据库
require("./db");
// 创建集合规则2
let productSchema=new mongoose.Schema({
  proname:{
    type:String
  },
  price:{
    type:Number
  }
})
// 使用集合规则创建集合
let Products = mongoose.model("Products", productSchema);
// 暴露
module.exports = {
  Products
};