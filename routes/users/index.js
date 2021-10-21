// 引入模块
let express=require('express');

// 引入controller
let userController=require('../../controller/userController');
let router = new express.Router();
//登录页面
router.get("/login", userController.login);
//点击登录页面  这是post请求
router.post('/dologin',userController.Dologin);
//注册页面
router.get("/register", userController.register);
//点击注册页面  这是post请求
router.post('/doregister',userController.Doregister);
//首页
router.get("/welcome", userController.welcome);
// 删除
router.get("/welcome/delete",userController.Dodelete);
// 修改
router.get('/welcome/update',userController.Doupdate1);
// 修改页面中的跳转
router.post('/doupdate',userController.Doupdate2);
// 搜索
router.get('/find',userController.find);
// 添加
router.get('/add',userController.add);
// 点击添加
router.post('/doadd',userController.doadd);

// 暴露
module.exports=router;

