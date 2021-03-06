const controller = require('../controller/controller_user');
const router = require('express').Router();

router.get('/users', controller.getAll)
router.post('/register',controller.register)
router.post('/login', controller.login)
router.get('/users/:id', controller.getUserById)
router.put('/update/:id', controller.updateUser)
router.delete('/delete/:id', controller.DeleteUser)

module.exports = router;
