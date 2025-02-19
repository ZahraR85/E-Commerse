import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "men", "women", "children"
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }, // URL for image
});

const Product = mongoose.model('Product', productSchema);

export default Product;
