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
            const uploadResult = await cloudinary.uploader.upload(file, { // Added await here
                unique_filename: true,
                folder: "/blood/"+dir,
            });

            // Ensure the file exists before attempting to unlink
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
            
            const optimizeUrl = cloudinary.url(uploadResult.public_id, { // Changed from (await uploadResult) to uploadResult
                quality:'auto',
                fetch_format: 'auto'
            });
            
            return { uploadResult, optimizeUrl };

        } catch (exception) {
            console.error("Cloudinary Upload Error:", exception); // Log the actual exception
            throw {
                code: 422,
                message: "File upload error...",
                status: "FILE_UPLOAD_ERROR",
                details: exception.message || "No specific error message provided." // Add details from exception
            };
        }
    }
}

const cloudinarySvc = new CloudinaryServices();
module.exports = cloudinarySvc; // Corrected module.exports syntax