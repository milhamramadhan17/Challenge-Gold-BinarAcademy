const db = require("../../models");
const Orders = db.Orders;
const Op = db.Sequelize.Op;
const controller = {};

controller.getAll = async (req, res) => {
    const dataOrders = req.query.dataOrders
    var condition = dataOrders ? {dataOrders: {[Op.like]: `%${dataOrders}%`} } : null;
    try {
        await Orders.findAll({where: condition})
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

module.exports = controller;