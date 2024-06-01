const { localsName } = require("ejs");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

let db = require("../database/models");

const userController = {
  login: (req, res) => {
    return res.render("users/login");
  },

  loginproceso: (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((userToLogin) => {
      if (userToLogin) {
        let passwordOk = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );
        
        if (passwordOk) {
          delete userToLogin.password;
          req.session.userLoged = userToLogin;
          if (req.body.recordarme) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 10 });
          }

          return res.redirect("/");
        }

        return res.render("users/login", {
          errors: {
            email: {
              msg: "Las credenciales son invalidas",
            },
          },
        });
      }
      return res.render("users/login", {
        errors: {
          email: {
            msg: "Este correo no esta registrado",
          },
        },
      });
    });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/");
  },

  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    db.User.create({
      first_name: req.body.name,
      last_name: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      roles_id: 2,

      avatar: req.file.filename,
    }).then(() => {
      console.log("creado correctamente");
      res.redirect("/");
    });
  },
  userProfile: (req, res) => {
    return res.render("users/profile");
  },

  editUser: (req, res) => {
    let userId = req.params.id
    db.User.findByPk(userId)
    .then((user)=>{
      return res.render("users/edit",{user});
    })
    
  },

  processEdit: (req, res) => {
    let userId = req.params.id;
    db.User.update({
      first_name: req.body.name,
      last_name: req.body.lastName,
      email: req.body.email,
      avatar: (req.file)?req.file.filename:req.session.userLoged.avatar
    },
    {
      where: {
        id: userId,
      },
    }
        )
        return res.redirect("/users/profile");  
  },
};

module.exports = userController;
