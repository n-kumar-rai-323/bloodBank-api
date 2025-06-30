const cloudinaryConfig = require("../config/config");
const fs = require("fs")
const cloudinary = require("cloudinary").v2;

class CloudinaryServices {
    constructor() {
        cloudinary.config({
            cloud_name: cloudinaryConfig.cloudName,
            api_key: cloudinaryConfig.apiKey,
            api_secret: cloudinaryConfig.apiSecret
        });
    }

    uploadFile = async (file, dir = '') => {
        try {
            const uploadResult = await cloudinary.uploader.upload(file, { 
                unique_filename: true,
                folder: "/blood/" + dir,
            });

            
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }

            const optimizeUrl = cloudinary.url(uploadResult.public_id, { 
                quality: 'auto',
                fetch_format: 'auto'
            });

            return {
                url: uploadResult.secure_url,
                optimizeUrl: optimizeUrl
            };

        } catch (exception) {
            console.error("Cloudinary Upload Error:", exception); 
            throw {
                code: 422,
                message: "File upload error...",
                status: "FILE_UPLOAD_ERROR",
                details: exception.message || "No specific error message provided." 
            };
        }
    }
}

const cloudinarySvc = new CloudinaryServices();
module.exports = cloudinarySvc; // Corrected module.exports syntax