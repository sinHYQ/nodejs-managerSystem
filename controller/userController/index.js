// 引入加密的md5
let md5 = require("md5");
// 引入数据库--使用解构的方式
let { Users } = require("../../database/user");
// 引入
let formidable = require("formidable");
let path = require("path");
// 暴露
// 登录页面渲染
exports.login = (req, res) => {
  res.render("admin/login/login");
};
// 注册页面渲染
exports.register = (req, res) => {
  res.render("admin/register/register");
};

// 点击登录按钮提交数据
// 使用async和await来和数据库进行对比
// async是回调函数
// await是等待Promise对象，而使用数据库查询自己想要的东西时，返回的是个Promise对象
exports.Dologin = async (req, res) => {
  let username = req.body.username;
  // 对密码进行加密
  let password = req.body.password;
  // 判断用户是否存在，如果存在，判断密码是否正确
  let isUserName = await Users.findOne({
    username: username,
  });
  let isUserPassword = await Users.findOne({
    username: username,
    password: password,
  });
  if (!isUserName) {
    res.send(
      '<script>alert("该用户不存在，请注册");location.href="/api/register"</script>'
    );
  } else if (!isUserPassword) {
    res.send(
      '<script>alert("用户名或者密码错误，请重新登录");location.href="/api/login"</script>'
    );
  } else {
    // 登陆成功，记录用户名
    req.app.locals.username = username;
    req.session.username = username;
    res.redirect("/api/welcome");
  }
};
// 点击注册按钮提交数据
// 与点击登录按钮相似，都是需要与数据库做对比
exports.Doregister = async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  // 对密码进行加密
  let password = req.body.password;
  let sex = req.body.sex;
  let age = req.body.age;
  let address = req.body.address;
  // 头像
  let photo = req.body.photo;

  let isUser = await Users.findOne({
    username: username
  });
  // 首先判断数据库中是否存在该用户，如果有就提示该用户，直接登录，否则就注册
  if (!isUser) {
    let userInfo = {
      username: username,
      password: password,
      // photo:databuffer,
      sex: sex,
      age: age,
      address: address,
    };
    // 把数据插入数据库中
    let result = await Users.create(userInfo);
    if (result) {
      res.redirect("/api/login");
    }
  } else {
    //如果存在
    res.send(
      '<script>alert("该用户应经注册，请登录");location.href="/api/login"</script>'
    );
  }
};
// 首页列表渲染
exports.welcome = async (req, res) => {
  //http://localhost:3000/admin/userlist?page=1&size=10
  //page 请求的页数
  //size 每页显示数据条数
  console.log(req.query);
  let page = Number(req.query.page) || 1;
  let size = Number(req.query.size) || 6;
  // 查询总的数据条数
  let totalUsers = await Users.countDocuments({});
  // 计算总的页数
  let totalPages = Math.ceil(totalUsers / size);

  let datalist = await Users.find({}).skip((page - 1) * size).limit(size);

  res.render("admin/users/welcome", {
    datalist: datalist,
    total: totalUsers,
    page: page,
    size: size,
    totalPages: totalPages,
  });
};
// 删除操作
exports.Dodelete = (req, res) => {
  Users.findOneAndDelete(req.query).then(() => {
    console.log("删除成功");
  });
  res.redirect("/api/welcome");
};
// 修改操作
exports.Doupdate1 = async (req, res) => {
  // 携带的修改参数--id
  let updatelist1 = req.query;
  // 根据id查询对应的数据
  let updatelist2 = await Users.findOne(updatelist1);
  console.log(updatelist2); //数组对象
  /* 
  {
  _id: new ObjectId("616d7725682e7053ea271ccc"),
  username: '张虹约',
  password: '1234',
  sex: '女',
  age: 21,
  address: '河南郑州',
  __v: 0,
  photo: 'IMG_20201128_225415.jpg'
}
 */
  // 渲染到修改页面
  res.render("admin/users/update", {
    updatelist2: updatelist2,
  });
};
// 修改页面点击提交
exports.Doupdate2 = async (req, res) => {
  // console.log(req.query); //{ _id: '616cde79aa36ecb42af3dbaa' }
//  创建对象
 const form=new formidable.IncomingForm();
  // 配置上传文件的文件夹
  form.uploadDir=path.join(__dirname,'../','../','public','upload');
  // 保留后缀名
  form.keepExtensions=true;
  // 解析参数
  form.parse(req,async(err,fields,files)=>{
    let result={};
    if(!files.photo.name){
      //条件成立说明没有修改图片
      result = await Users.updateOne(req.query, {
        username:fields.username,
        password:fields.password,
        age:fields.age,
        address:fields.address
      });
    }else{
      result = await Users.updateOne(req.query, {
        username: fields.username,
        password: fields.password,
        age: fields.age,
        address: fields.address,
        photo:files.photo.path.split('public')[1]
      });
    }
    if(result){
      res.redirect("/api/welcome");
    }
  })
};
// 搜索
exports.find = async (req, res) => {
  //http://localhost:3000/admin/userlist?page=1&size=10
  //page 请求的页数
  //size 每页显示数据条数
  let keywords = req.query.keywords; //关键字

  let page = Number(req.query.page) || 1;
  let size = Number(req.query.size) || 6;
  // 查询搜索的数据条数
  let totalUsers = await Users.countDocuments({
    username: new RegExp(keywords, "gi"),
  });
  // 计算总的页数
  let totalPages = Math.ceil(totalUsers / size);

  let datalist = await Users.find({
    username: new RegExp(keywords, "gi"),
  })
    .skip((page - 1) * size)
    .limit(size);

  res.render("admin/users/find", {
    keywords: keywords,
    datalist: datalist,
    total: totalUsers,
    page: page,
    size: size,
    totalPages: totalPages,
  });
};
// 添加
exports.add = async (req, res) => {
  res.render("admin/users/add");
};
// 点击添加
exports.doadd = async (req, res) => {
  // 创建一个表单对象
  const form = new formidable.IncomingForm();
  // 配置上传文件到那个目录
  form.uploadDir = path.join(__dirname, "../", "../", "public", "upload");
  // 保留后缀名
  form.keepExtensions = true;
  // 解析参数
  form.parse(req, async(err, fields, files) => {
    // console.log(fields);
    // 创建文档并加入到库
    let result = await Users.create({
      username: fields.username,
      password: fields.password,
      sex: fields.sex,
      age: fields.age,
      address: fields.address,
      photo: files.photo.path.split("public")[1],
    });
    // 渲染到首页
    if (result) {
      res.redirect("/api/welcome");
    }
  });
};


