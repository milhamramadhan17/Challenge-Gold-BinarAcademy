const db = require("../../models");
const Users = db.Users;
const Op = db.Sequelize.Op;
const controller = {};

controller.getAll = async (req, res) => {
    const dataUsers = req.query.dataUsers
    var condition = dataUsers ? {dataUsers: {[Op.like]: `%${dataUsers}%`} } : null;
    try {
        await Users.findAll({where: condition})
        .then(results => {
            res.send(results)
        })
    } catch (error) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
    }
}

controller.register = async (req, res) => {
    const User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pass: req.body.pass,
        createdAt: new Date(),
        updateAt: new Date()
    }

    try {
        await Users.findOne({
            where: {
                email: User.email
            }
        })
        .then(results => {
            if(results) {
                res.send("User already in database")
            } else {
                Users.create(User)
                .then (() => {
                    res.status(401).send("Berhasil register")
        })
            }
        })
        
    } catch (error) {
        res.status(500).send("error")
    }
}

controller.login = async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    try {
        await Users.findOne({
            where: {
                email: email,
                pass: pass
            }
        })
        .then(results => {
            if(results) {
                res.send("Login's successfully");
            } else {
                res.status(404).send({
                    message: `Cannot find User.`
                })
            } 
        });
    } catch (error) {
        
    }
}

controller.getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        await Users.findByPk(id)
        .then(results => {
            if (results) {
                res.send(results);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id ${id}.`
                });
            };
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving User with id=" + id
          });
    }
}

//  controller.updateName = async (req, res) => {
//      const id = req.params.id;
//      const firstName = req.body.firstName;
//      const lastName = req.body.lastName;
   
//     try {
//         await Users.update({lastName: lastName}, {
//             where: {
//                 id: id,
//                 lastName: lastName
//             }
//         })
//         .then(() => res.status(203).send("Updated is successfully"))
//     } catch (error) {
//         res.status(404).send("Update is error")
//     }
//  }

controller.DeleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await Users.destroy({
            where: {
                id: id
            }
        })
        .then(() => res.status(204).send("Delete user's successfully"))
    } catch (error) {
        res.status(400).send("error")
    }
    
}

module.exports = controller;