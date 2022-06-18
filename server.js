const express = require('express');
const app = express();
const db = require("./models")
const routerUsers = require('./src/route/Users')
const routerOrders = require('./src/route/Orders')
const routerItems = require('./src/route/Items')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({msg: "Welcome to my home."});
})

app.use('/api/user', routerUsers)
app.use('/api/order', routerOrders)
app.use('/api/item', routerItems)


app.listen(port, () => {console.log(`Server is running on port ${port}`)})