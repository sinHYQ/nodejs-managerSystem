// 引入模块
let mongoose=require('mongoose');
// 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/hoagu").then(()=>{
    console.log('连接成功');
}).catch((err)=>{
    console.log(err);
})

