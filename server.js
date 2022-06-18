const express = require('express');
const app = express();
const db = require("./models")
const router = require('./src/route/Users')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({msg: "Welcome to my home."});
})

app.use('/api/user', router)


app.listen(port, () => {console.log(`Server is running on port ${port}`)})