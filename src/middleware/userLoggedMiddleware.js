let db = require("../database/models");

function userLoggedMiddleware(req, res, next) {
  //si la coockie con el email existe la usamos para buscar el usuario de la base de datos
  if (req.cookies.userEmail) {
    db.User.findOne({
      where: {
        email: req.cookies.userEmail,
      },
    }).then((userFromCookie) => {
      // console.log(userFromCookie)
      //una vez buscamos el usuario con dicho email, guardamos los datos en una session
      if (userFromCookie) {
        req.session.userLoged = userFromCookie
      }
      //si la session contiene algo, es decir tiene los datos de un usuario
      if (req.session.userLoged) {
        //creamos una locals y le asignamos true
        res.locals.isLogged = true
        //tambien creamos una locals que contenga la informacion de la session que tenia los datos del usuario
        res.locals.userLoged = req.session.userLoged
      } else {
        //en caso de que la session no contiene ningun dato de usuario la locals islogged sera falsa
        res.locals.isLogged = false
      }
      //de cumplirse alguna condicion simplemente continua normal
      next()
    })

  } else {
    //si una session ya existia es decir en caso de que cierres la pagina por error como ejemplo, aun seguiria existiendo la session
    //en ese caso hacemos lo mismo con las locals como antes, si existe la session y contiene info del usuario
    if (req.session.userLoged) {
      //en la locals isLogged la hacemos true
      res.locals.isLogged = true
      //en la locals de userLogged le asignamos la informacion del usuario
      res.locals.userLoged = req.session.userLoged
    } else {
      //en caso de que la session haya expirado simplmente hacemos false la locals IsLogged
      res.locals.isLogged = false
    }

    next()
  }
}

module.exports = userLoggedMiddleware;
