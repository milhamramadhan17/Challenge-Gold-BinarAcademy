const db = require("../../models");
const Items = db.Items;
const Orders = db.Orders;
const Op = db.Sequelize.Op;
const controller = {};

controller.getAll = async (req, res) => {
    const dataOrders = req.query.dataOrders
    var condition = dataOrders ? {dataOrders: {[Op.like]: `%${dataOrders}%`} } : null;
    try {
        await Orders.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
    } catch (error) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving orders."
          });
    }
}

controller.addOrder = async (req, res) => {
    try {
        const orderItem = await Items.findOne({
            where: {
                 id: req.body.id_product
            }
        })
        const order = {
            id_product  : req.body.id_product,
            id_users    : req.body.id_users,
            qty         : req.body.qty,
            amount      : req.body.qty * orderItem.dataValues.price
        }
    
        await Orders.create(order)
        .then(() => {
            res.status(201).send("Added order is successfully")
        })

    } catch (err) {
        res.status(500).send({
            message:
            err.message || "There are'nt data in database"
        })
    }
}

controller.getOrderById = async (req, res) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if (results) {
                res.send(results);
            } else {
                res.status(404).send({
                    message: `Cannot find Order with id ${id}.`
                });
            };
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving Order with id=" + id
          });
    }
}

controller.updateOrder = async (req, res) => {
    try {
         await Orders.update(req.body, {
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

controller.DeleteOrder = async (req, res) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if(results) {
                Orders.destroy({
                    where: {
                        id: id
                    }
                })
                .then((results) => {
                    res.status(204).send({
                        delete: results
                    })
                })
            } else {
                res.send("There's not data")
            }
        })

    } catch (err) {
        res.status(400).send({
            message:
            err.message || "There is something wrong"
        })
    }
    
}

module.exports = controller;