let db = require('../database/models');
const mainController = {
    index :(req,res)=>{
        
        db.Product.findAll({
            include : [
                {association : "images"}
            ]
        }).then(products =>{           
            return res.render('products/index',{products})
        })
    }
}

module.exports = mainController;