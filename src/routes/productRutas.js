const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/middlemulter");
const jerarquiaMiddleware = require("../middleware/jerarquiaMiddleware");
const validationProductEdit = require("../middleware/validatorEditProductMiddleware");
const validationNewProduct = require("../middleware/validatorNewProduct");

router.get("/cart", productController.cart);
router.get("/detailProduct/:id", productController.detail);
router.get("/search", productController.search);
router.get("/getProducts/:categoria", productController.getProducts);

//CRUD de Products
router.get(
  "/createProduct",
  jerarquiaMiddleware,

  productController.create
);
router.post(
  "/storeProduct",
  upload.single("portada"),
  validationNewProduct,
  productController.store
);
router.get("/edit/:id", jerarquiaMiddleware, productController.edit);
router.put(
  "/edit/:id",
  upload.single("image"),
  validationProductEdit,
  productController.update
);
router.post("/delete/:id", productController.eliminar);
module.exports = router;
