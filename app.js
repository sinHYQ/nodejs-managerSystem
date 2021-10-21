// 引入模块
let express=require('express');
let bodyParser=require('body-parser');
let session=require('express-session');
// 引入路由
let userRouter=require('./routes/users');
let productRouter=require('./routes/products');
// 搭建服务器
let app=new  express();
// 使用文件提交
app.use(bodyParser.urlencoded({ extended: false }));
// 搭建ejs引擎
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public'));
// 设置虚拟目录
app.use('/api',express.static('public'));
// 配置session
app.use(session({
    secret:'this is a nice day',
    resave:false,//强制保存session
    saveUninitialized:true,//强制保存未初始化的session
    cookie:{
        maxAge:10*1000//配置过期时间
    },
    rolling:true//重新记录cookie的过期时间
}));

// 使用路由
app.use("/api", userRouter);
app.use("/api", productRouter);

// 应用级中间件---拦截路由
app.use((req,res,next)=>{
    // 如果不是登录，或者点击登录，或者没有登录（记录session），就拦截页面，只处于登录页面
    if (req.url != "/api/login" &&req.url != "/api/dologin" &&!req.session.username) {
      res.redirect("/api/login");
    } else {
      next();
    }
}); 


// 监听端口号
app.listen(3000,()=>{
    console.log('3000running');
})