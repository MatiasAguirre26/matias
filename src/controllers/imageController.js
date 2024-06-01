let db = require('../database/models');
const { Op } = require("sequelize");

const imageController = {
    create : (id,image)=>{
        db.Image.create({
            name : image,
            products_id :id,
        }).then(()=>{
            console.log("cargue las imagenes")
        })
    },

    edit : (id,image)=>{
        db.Image.update({
            name : image,
            
        },{
            where : {
                products_id : id
            }
        })
    }
}

module.exports = imageController