const controller = require('../controller/controller_item');
const router = require('express').Router();

router.get('/items', controller.getAll)
router.get('/items/:id', controller.getItemById)
router.post('/addProduct', controller.addProduct)
router.put('/items/:id', controller.updateItem)
router.delete('/delete/:id', controller.DeleteItem)


module.exports = router;