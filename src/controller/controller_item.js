const db         = require("../../models");
const Items      = db.Items;
const Op         = db.Sequelize.Op;
const controller = {};

controller.getAll = async (req, res) => {
    const dataItems = req.query.dataItems
    var condition = dataItems ? {dataItems: {[Op.like]: `%${dataItems}%`} } : null;
    try {
        await Items.findAll({where: condition})
        .then(results => {
            res.send(results)
        })
    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving items."
          });
    }
}

controller.addProduct = async (req, res) => {
    const item = {
        product : req.body.product,
        price   : req.body.price
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
                Items.create(item)
                .then (() => {
                    res.status(201).send("Berhasil register")
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

controller.updateItem = async (req, res) => {
    try {
         await Items.update(req.body, {
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

controller.DeleteItem = async (req, res) => {
    const id = req.params.id;
    try {
        await Items.findByPk(id)
        .then(results => {
            if(results) {
                Items.destroy({
                    where: {
                        id:id
                    }
                })
                .then((results) => {
                    res.status(204).send("delete is successfully")
                })
            } else {
                res.send("There's not data")
            }
        })
    } catch (error) {
        res.status(400).send("error")
    }
    
}

module.exports = controller;