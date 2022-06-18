const db = require("../../models");
const Items = db.Items;
const Op = db.Sequelize.Op;
const controller = {};

controller.getAll = async (req, res) => {
    const dataItems = req.query.dataItems
    var condition = dataItems ? {dataItems: {[Op.like]: `%${dataItems}%`} } : null;
    try {
        await Items.findAll({where: condition})
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

controller.addProduct = async (req, res) => {
    const item = {
        product: req.body.product,
        price: req.body.price
    }

    try {
        await Items.findOne({
            where: {
                product: item.product
            }
        })
        .then(results => {
            if(results) {
                res.send("Product already in database")
            } else {
                Users.create(item)
                .then (() => {
                    res.status(401).send("Berhasil register")
        })
            }
        })

    } catch (error) {
        res.status(500).send("error")
    }
}

controller.getItemById = async (req, res) => {
    const id = req.params.id;
    try {
        await Items.findByPk(id)
        .then(results => {
            if (results) {
                res.send(results);
            } else {
                res.status(404).send({
                    message: `Cannot find Item with id ${id}.`
                });
            };
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving Item with id = " + id
          });
    }
}

// controller.updatedItems = async (req, res) => {

// }

controller.DeleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        await Items.destroy({
            where: {
                id: id
            }
        })
        .then(() => res.status(204).send("Delete Item's successfully"))
    } catch (error) {
        res.status(400).send("error")
    }
    
}

module.exports = controller;