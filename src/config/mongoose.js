const mongoose = require("mongoose");
const { dbConfig } = require("./config");

const dbInit = async () => {
    try {
        await mongoose.connect(dbConfig.mongodb.URL, {
            dbName: dbConfig.mongodb.name,
            autoCreate:true,
            autoIndex:true
        })
        console.log("***** MongoDB Connected Successfully *****")
    } catch (exception) {
        throw {
            code: 500,
            message: "Database Connection Error...",
            status: "ERROR_DB_CONNECTION"
        }
    }
}

dbInit()