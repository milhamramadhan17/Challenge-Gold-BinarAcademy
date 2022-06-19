const controller = require('../controller/controller_order');
const router = require('express').Router();

router.get('/orders', controller.getAll)
router.get('/orders/:id', controller.getOrderById)
router.post('/addOrder', controller.addOrder)
// router.put('/update/:id', controller.updateOrder)
router.delete('/delete/:id', controller.DeleteOrder)


module.exports = router;