require("dotenv").config()
const cloudinaryConfig ={
    cloudName:process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
}

const smtpConfig={
    provider:process.env.SMTP_PROVIDER,
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    user:process.env.SMTP_USER,
    password:process.env.APP_PASSWORD,
    from:process.env.SMTP_FROM
}

const dbConfig={
    mongodb:{
        URL:process.env.MONGODB_URL,
        name:process.env.MONGODB_NAME
    }
}

const AppConfig ={
    frontUrl:process.env.FRONTEND_URL || "http://localhost:5173/",
}

module.exports = {cloudinaryConfig, smtpConfig, dbConfig, AppConfig}