function guestMiddleware(req, res, next) {
    if(req.session.userLoged) {
       
        return res.redirect('/');
    }
    next();
}

module.exports = guestMiddleware;