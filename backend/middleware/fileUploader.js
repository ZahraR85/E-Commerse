import multer from "multer";

// 10MB limit
const fileSize = 10 * 1024 * 1024;
const allowedMimeTypes = ["image/png", "image/jpeg"];

// Filter files by type
function fileFilter(req, file, cb) {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG or PNG images are allowed."));
    }
}

// Use memory storage
const fileUploader = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize },
    fileFilter,
});

export default fileUploader;
