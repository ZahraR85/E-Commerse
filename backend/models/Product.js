import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // URL for image
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: String }, // Subcategory name (e.g., Jeans)
});

export default mongoose.model("Product", ProductSchema);
