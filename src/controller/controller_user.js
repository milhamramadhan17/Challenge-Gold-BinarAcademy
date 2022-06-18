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

controller.addUser = async (req, res) => {
    const User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pass: req.body.pass,
        createdAt: new Date(),
        updateAt: new Date()
    }
    try {
        await Users.create(User)
        .then ((results) => {
            res.status(401).send("Berhasil register")
        })
    } catch (error) {
        res.status(500).send(error)
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


module.exports = controller;