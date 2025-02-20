import express from "express";
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import fileUploader from "../middleware/fileUploader.js";
import cloudUploader from "../middleware/cloudinaryMultiple.js";

const router = express.Router();

// Create a product (uploads images)
router.post(
  "/",
  fileUploader.array("images", 15), // Ensure this matches the Postman key
  (req, res, next) => {
      console.log("Multer processed files:", req.files); // Debug
      next();
  },
  cloudUploader,
  createProduct
);


// Get all products
router.get("/", getAllProducts);

// Get a product by ID
router.get("/:id", getProductById);

// Update a product (with new images)
router.put(
    "/:id",
    fileUploader.array("images", 15), 
    cloudUploader,
    updateProduct
);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;
