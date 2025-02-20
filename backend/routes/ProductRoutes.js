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

router.post("/", fileUploader.array("images", 15), cloudUploader, createProduct); // Create a new product
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get a product by ID
router.put("/:id", fileUploader.array("images", 15), cloudUploader, updateProduct); // Update a product
router.delete("/:id", deleteProduct); // Delete a product

export default router;
