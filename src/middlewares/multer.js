// // In your Express application file (e.g., app.js or a route file)
// const express = require('express');
// const router = express.Router();
// const uploader = require('./path/to/your/uploader-module'); // Adjust the path

// // Route to handle image uploads
// router.post('/upload-image', uploader('image').single('imageField'), (req, res) => {
//     // 'imageField' is the name attribute of your file input in the HTML form
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//     }
//     res.json({ message: 'Image uploaded successfully!', filename: req.file.filename });
// });

// // Route to handle document uploads
// router.post('/upload-doc', uploader('doc').single('docField'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded.' });
//     }
//     res.json({ message: 'Document uploaded successfully!', filename: req.file.filename });
// });

// // Route to handle multiple image uploads (e.g., up to 5 images)
// router.post('/upload-multiple-images', uploader('image').array('imageFields', 5), (req, res) => {
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ message: 'No files uploaded.' });
//     }
//     res.json({ message: 'Images uploaded successfully!', filenames: req.files.map(file => file.filename) });
// });

// // Error handling for Multer (important!)
// router.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         // A Multer error occurred when uploading.
//         return res.status(400).json({ code: err.code, message: err.message, status: "MULTER_ERROR" });
//     } else if (err && err.status === "INVALID_FILE_FORMAT") {
//         // Custom error from fileFilter
//         return res.status(err.code || 422).json({ code: err.code, message: err.message, status: err.status });
//     } else if (err) {
//         // An unknown error occurred.
//         return res.status(500).json({ message: 'An unknown error occurred during file upload.', error: err.message });
//     }
//     next(); // Pass to next middleware if no error
// });

// module.exports = router;