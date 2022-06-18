const express = require('express');
const routerUsers = require('./src/route/routeUsers');


const app = express();
const port = 3000;


const longger = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}

app.use(longger);

app.use(express.json());

app.use("/api/v1/user", routerUsers)





app.listen(port, () => console.log(`app listen on port ${port}`));

module.exports = app;


