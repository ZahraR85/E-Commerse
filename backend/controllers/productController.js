import Product from "../models/Product.js";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, subcategory } = req.body;
    const product = new Product({ name, description, price, image, category, subcategory });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Get products by category or subcategory
export const getProducts = async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
