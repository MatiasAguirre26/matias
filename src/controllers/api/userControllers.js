const db = require('../../database/models');
const sequelize = db.sequelize;

const usersControllers = {
    'lista': (req, res) => {
        db.User.findAll()
        .then(allUsers => {

            let usuarios = [];
            
            allUsers.forEach(data => {
                let usuario = {
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    detail: `/api/users/${data.id}`
                };
                usuarios.push(usuario);
            })
            res.status(200).json( {
                data: {
                    count: usuarios.length,
                    status:200
                },
                usuarios
            })
        }).catch(error => {res.send({error:'Not found'});})

    },
    "detail": (req, res)=>{
        db.User.findByPk(req.params.id)
        .then(data => {
            let usuarios= {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                avatar: `http://localhost:3001/images/avatars/${data.avatar}`
            };
            res.status(200).json( {
                meta: {
                    status:200,
                    url: "api/users/"+data.id
                },
                usuarios
            });
        }).catch(error => {res.send({error:'Not found'});})

    }
}
module.exports = usersControllers