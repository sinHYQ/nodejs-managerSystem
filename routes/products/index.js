// 引入模块
let express = require("express");

// 引入controller
let productController = require("../../controller/productController");
let router = new express.Router();
// 商品列表
router.get("/prolist", productController.prolist);
// 商品修改
router.get("/prolist/update",productController.update);
// 商品点击修改
router.post("/proDoupdate",productController.doupdate);
// 商品删除
router.get("/prolist/delete",productController.dodelete);
// 商品查找
router.get("/proFind", productController.proFind);
// 商品添加
router.get("/addPro", productController.addPro);
// 点击添加
router.get("/doadd",productController.doadd);
// 暴露
module.exports=router;