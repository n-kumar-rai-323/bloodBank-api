const express = require("express")
require("./mongoose")
const routerConfig = require("./router.config")
const app = express()
const fs = require("fs")

app.use(express.json())
app.use(express.urlencoded())


app.use("/api", routerConfig)

app.use((req, res, next) => {
    next({
        code: 404,
        message: "Resource not found",
        status: "NOT_FOUND"
    });
})

// Error handling Middleware 
app.use((error, req, res, next) => {
    let code = error.code || 500
    let errorDetail = error.details || null
    let msg = error.message || "Server Error"
    let status = error.status || "SERVER_ERROR"


    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path)
    }

    res.status(code).json({
        error: errorDetail,
        message: msg,
        status: status,
        options: null
    })
})
module.exports = { app }