const http = require("http")
const { app } = require("./src/config/express.config")
const PORT = 9800
const server = http.createServer(app)


server.listen(PORT,'localhost',(err)=>{
    if(!err){
        console.log(`Application Running ${PORT}`)
    }
})