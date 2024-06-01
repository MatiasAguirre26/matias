let db = require("../database/models");
const { Op } = require("sequelize");
const imageController = require("../controllers/imageController");
const { validationResult } = require("express-validator");
const productController = {
  cart: (req, res) => {
    res.render("products/cart");
  },

  detail: (req, res) => {
    let productId = req.params.id;
    db.Product.findByPk(productId, {
      include: ["images", "category", "state", "detail", "size"],
    }).then((product) => {
      db.Product.findAll({
        where: {
          name: {
            [Op.like]:
              "%" + product.name.slice(0, product.name.length - 5) + "%",
          },
          id: {
            [Op.ne]: product.id,
          },
        },
        include: ["images"],
        limit: 4,
      }).then((products) => {
        return res.render("products/productDetail", { product, products });
      });
    });
  },

  search: (req, res) => {
    let search = req.query.searchbar;

    db.Product.findAll({
      where: {
        name: { [Op.like]: "%" + search + "%" },
      },
      include: ["images"],
    }).then((products) => {
      res.render("products/searchProducts", { products });
    });
  },

  getProducts: (req, res) => {
    let categoria = req.params.categoria;
    switch (categoria) {
      case "mangas":
        categoria = 1;
        break;
      case "comics":
        categoria = 2;
        break;
      case "libros":
        categoria = 3;
        break;

      default:
        break;
    }

    db.Product.findAll({
      include: [{ association: "images" }],
      where: {
        categories_id: categoria,
      },
    }).then((products) => {
      res.render("products/Categoria", { products });
    });
  },

  create: (req, res) => {
    let promEditorials = db.Editorial.findAll();
    let promCategories = db.Category.findAll();
    let promDetails = db.Detail.findAll();
    let promSizes = db.Size.findAll();
    let promStates = db.State.findAll();

    Promise.all([
      promCategories,
      promEditorials,
      promDetails,
      promSizes,
      promStates,
    ]).then(
      ([allCategories, allEditorials, allDetails, allSizes, allStates]) => {
        // res.json(allCategories)
        res.render("products/agregarProducto", {
          allCategories,
          allEditorials,
          allDetails,
          allSizes,
          allStates,
        });
      }
    );
  },

  store: (req, res) => {
    let allEditorials = db.Editorial.findAll();
    let allCategories = db.Category.findAll();
    let allDetails = db.Detail.findAll();
    let allSizes = db.Size.findAll();
    let allStates = db.State.findAll();
    const resultValidation = validationResult(req);
    if (resultValidation.isEmpty()) {
      db.Product.create({
        name: req.body.nombre,
        price: req.body.precio,
        description: req.body.descripcion,
        stock_min: req.body.stockMin,
        stock_max: req.body.stockMax,
        states_id: req.body.estado,
        categories_id: req.body.categoria,
        sizes_id: req.body.formato,
        details_id: req.body.detail,
        editorials_id: req.body.editorial,
      }).then((aux) => {
        let image = req.file.filename;

        imageController.create(aux.id, image);
        console.log("cree un nuevo producto");
        res.redirect("/");
      });
    } else {
      Promise.all([
        allCategories,
        allEditorials,
        allDetails,
        allSizes,
        allStates,
      ]).then(
        ([allCategories, allEditorials, allDetails, allSizes, allStates]) => {
          res.render("products/agregarProducto", {
            allCategories,
            allEditorials,
            allDetails,
            allSizes,
            allStates,
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        }
      );
    }
  },

  edit: (req, res) => {
    let productId = req.params.id;
    let promProducts = db.Product.findByPk(productId, {
      include: ["category", "state", "detail", "editorial", "size", "images"],
    });

    let promEditorials = db.Editorial.findAll();
    let promCategories = db.Category.findAll();
    let promDetails = db.Detail.findAll();
    let promSizes = db.Size.findAll();
    let promStates = db.State.findAll();

    Promise.all([
      promProducts,
      promCategories,
      promEditorials,
      promDetails,
      promSizes,
      promStates,
    ]).then(
      ([
        product,
        allCategories,
        allEditorials,
        allDetails,
        allSizes,
        allStates,
      ]) => {
        return res.render("products/editarProducto", {
          product,
          allCategories,
          allEditorials,
          allDetails,
          allSizes,
          allStates,
        });
      }
    );
  },

  update: (req, res) => {
    //obtengo el resultado de las validaciones
    const resultValidation = validationResult(req);
    //inicialmente no habra ningun error en las validaciones puesto que no se edito nada y la informacion ya viene correcta

    if (resultValidation.isEmpty()) {
      //asi que simplmente tomare todos los datos que vienen y hare el update si los campos estan correctos
      let productId = req.params.id;
      //busco la imagen que este vinculada al producto a editar para usarlo luego
      let image = db.Image.findOne({
        where: {
          products_id: productId,
        },
      }).then(() => {
        //verifico si se eligio una nueva imagen o no
        if (req.file == undefined) {
          //en el caso de que no se haya elegido una nueva imagen, se usara la que ya estaba vinculada
          imageController.edit(productId, image.name);
        } else {
          //en caso de elegir una nueva imagen se tomara esa y se hara el update de la misma, antes de que se haga
          //el update de los campos del body
          imageController.edit(productId, req.file.filename);
        }
        //update del body
        db.Product.update(
          {
            name: req.body.nombre,
            price: req.body.precio,
            description: req.body.descripcion,
            stock_min: req.body.stockMin,
            stock_max: req.body.stockMax,
            states_id: req.body.estado,
            categories_id: req.body.categoria,
            sizes_id: req.body.formato,
            details_id: req.body.detail,
            editorials_id: req.body.editorial,
          },
          {
            where: {
              id: productId,
            },
          }
        ).then(() => {
          return res.redirect(`/products/detailProduct/${req.params.id}`);
        });
      });
    } else {
      //en caso de que hayan errores en las validaciones requerimos todos los datos del producto
      let id = req.params.id;
      let product = db.Product.findByPk(id);
      let allCategories = db.Category.findAll();
      let allEditorials = db.Editorial.findAll();
      let allDetails = db.Detail.findAll();
      let allSizes = db.Size.findAll();
      let allStates = db.State.findAll();
      //procedemos a cargarlas junto al renderizado de la vista de editar, ademas tambien pasamos los errores
      //y los datos previos para que estos no se pierdan
      Promise.all([
        product,
        allCategories,
        allEditorials,
        allDetails,
        allSizes,
        allStates,
      ]).then(
        ([
          product,
          allCategories,
          allEditorials,
          allDetails,
          allSizes,
          allStates,
        ]) => {
          res.render("products/editarProducto", {
            product,
            allCategories,
            allEditorials,
            allDetails,
            allSizes,
            allStates,
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        }
      );
    }
  },

  eliminar: function (req, res) {
    let productId = req.params.id;

    db.Product.findByPk(productId, {
      include: ["images"],
    }).then(() => {
      db.Image.destroy({
        where: {
          products_id: productId,
        },
      }).then(() => {
        db.Product.destroy({
          where: {
            id: productId,
          },
        }).then(() => {
          return res.redirect("/");
        });
      });
    });
  },
};

module.exports = productController;
