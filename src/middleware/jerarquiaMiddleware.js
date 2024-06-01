function jerarquiaMiddleware(req,res,next){
    console.log(req.session);
    if(req.session.userLoged.roles_id == 1){
        
        next();
    }else{
        return res.redirect('/')
    }
}

module.exports = jerarquiaMiddleware;