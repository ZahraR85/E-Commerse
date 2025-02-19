import Product from '../models/Product.js';

// Create Product
export async function createProduct(req, res) {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
}

// Get All Products
export async function getProducts(req, res) {
  try {
    const products = await find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching products', error });
  }
}

// Get Single Product
export async function getProductById(req, res) {
  try {
    const product = await findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching product', error });
  }
}

// Update Product
export async function updateProduct(req, res) {
  try {
    const updatedProduct = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
}

// Delete Product
export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error });
  }
}
