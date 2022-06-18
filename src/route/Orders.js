const controller = require('../controller/controller_order');
const router = require('express').Router();

router.get('/orders', controller.getAll)

module.exports = router;