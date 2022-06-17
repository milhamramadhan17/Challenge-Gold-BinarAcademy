const {Router} = require("express");
const routerUsers = Router();

const controller = require("../controller/controllerUsers");


routerUsers.get('/allUsers', controller.getAllUsers);
// routerUsers.get('/register/:id', controller.addUsers);
routerUsers.post('/register', controller.addUsers);




module.exports = routerUsers;