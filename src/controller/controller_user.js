const db            = require("../../models");
const Users         = db.Users;
const Op            = db.Sequelize.Op;
const controller    = {};

controller.getAll = async (req, res) => {
    const dataUsers = req.query.dataUsers
    var condition = dataUsers ? {dataUsers: {[Op.like]: `%${dataUsers}%`} } : null;
    try {
        await Users.findAll({where: condition})
        .then(results => {
            res.send(results)
        })
    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving users."
          });
    }
}

controller.register = async (req, res) => {
    const User = {
        firstName   : req.body.firstName,
        lastName    : req.body.lastName,
        email       : req.body.email,
        pass        : req.body.pass,
        createdAt   : new Date(),
        updateAt    : new Date()
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
        
    } catch (err) {
        res.status(500).send({
            message:
            err.message || "There's something wrong"
        })
    }
}

controller.login = async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    try {
        await Users.findOne({
            where: {
                email : email,
                pass  : pass
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
    } catch (err) {
        res.status(500).send({
            message:
            err.message || "There's something wrong"
        })
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
    } catch (err) {
        res.status(500).send({
            message:
            err.message || "Error retrieving User with id=" + id
          });
    }
}

controller.updateUser = async (req, res) => {
   try {
        await Users.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.status(203).json(
            {
                "message": "Updated Successfully"
        });
   } catch (err){
       res.status(404).send({
            message:
            err.message || "There's something wrong"
       })
   }
}

controller.DeleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await Users.findByPk(id)
        .then(results => {
            if(results) {
                Users.destroy({
                    where: {
                        id: id
                    }
                })
                .then((results) => {
                    res.send({
                        message: "Delete successfully"  
                    })
                })
            } else {
                res.send("There's not data")
            }
        })

    } catch (err) {
        res.status(400).send({
            message:
            err.message || "There's something wrong"
        })
    }
    
}

module.exports = controller;