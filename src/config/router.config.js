// src/app.js (or src/routes/index.js)

const express = require('express');
const routerConfig = express.Router();

const authRouter = require("../modules/auth/auth.route");


routerConfig.get("/blood", (req, res, next) => {
    let body = req.body;
    res.json({
        body: body,
        message: "From blood ....",
        status: "Success",
        options: null
    });
});

routerConfig.use('/auth', authRouter);


module.exports = routerConfig;