const controller = require('../controller/controller_user');
const router = require('express').Router();

router.get('/users', controller.getAll)
router.post('/register',controller.addUser)
router.get('/users/:id', controller.getUserById)

module.exports = router;
