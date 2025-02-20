import { Buffer } from "node:buffer";
import ErrorResponse from "../utils/ErrorResponse.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables early

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload multiple images to Cloudinary
const cloudUploader = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            throw new ErrorResponse("Please upload at least one image.", 400);
        }

        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                const b64 = Buffer.from(file.buffer).toString("base64");
                const dataURI = `data:${file.mimetype};base64,${b64}`;
                const cloudinaryData = await cloudinary.uploader.upload(dataURI, {
                    resource_type: "auto",
                });
                return cloudinaryData.secure_url;
            })
        );

        req.cloudinaryURLs = uploadedImages; // Store URLs in req for later use
        next();
    } catch (error) {
        next(error);
    }
};

export default cloudUploader;
