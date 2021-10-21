// 引入数据库--使用解构的方式
let { Products } = require("../../database/product");
// 引入
let formidable = require("formidable");
let path = require("path");

// 商品页面
exports.prolist = async (req, res) => {
  //http://localhost:3000/admin/userlist?page=1&size=10
  //page 请求的页数
  //size 每页显示数据条数
  let page = Number(req.query.page) || 1;
  let size = Number(req.query.size) || 6;
  // 查询总的数据条数
  let totalUsers = await Products.countDocuments({});
  // 计算总的页数
  let totalPages = Math.ceil(totalUsers / size);

  let datalist = await Products.find({})
    .skip((page - 1) * size)
    .limit(size);

  res.render("admin/products/prolist", {
    prolist: datalist,
    total: totalUsers,
    page: page,
    size: size,
    totalPages: totalPages,
  });
};
// 商品修改
exports.update = async (req, res) => {
  // req.query;//获得id
  let result = await Products.findOne(req.query);
  res.render("admin/products/proUpdate", {
    datalist: result,
  });
};
// 商品点击修改
exports.doupdate = async (req, res) => {
  let result = await Products.updateOne(req.query, {
    proname: req.body.proname,
    price: req.body.price,
  });
  if (result) {
    res.redirect("/api/prolist");
  }
};
// 商品删除
exports.dodelete = (req, res) => {
  // res.send(req.query);//获取id
  Products.findOneAndDelete(req.query).then(() => {
    console.log("删除成功");
  });
  res.redirect("/api/prolist");
};
// 商品查找
exports.proFind = async (req, res) => {
  let keywords = req.query.keywords; //关键字
  let page = Number(req.query.page) || 1;
  let size = Number(req.query.size) || 6;
  // 查询搜索的数据条数
  let totalUsers = await Products.countDocuments({
    proname: new RegExp(keywords, "gi"),
  });
  // 计算总的页数
  let totalPages = Math.ceil(totalUsers / size);

  let datalist = await Products.find({
    proname: new RegExp(keywords, "gi"),
  })
    .skip((page - 1) * size)
    .limit(size);

  res.render("admin/products/proFind", {
    keywords: keywords,
    prolist: datalist,
    total: totalUsers,
    page: page,
    size: size,
    totalPages: totalPages,
  });
};
// 商品添加
exports.addPro = async (req, res) => {
  res.render("admin/products/proAdd");
};
// 商品点击添加
exports.doadd = async (req, res) => {
  // res.send(req.query);
  /* {
      "proname": "oppo11111",
      "price": "111111"
    } */
    let result=await Products.create({
      proname:req.query.proname,
      price:req.query.price
    });
    if (result) {
      res.redirect("/api/prolist");
    }
};
