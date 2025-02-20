import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/ProductRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dotenv from "dotenv";
dotenv.config();

connectDB();

const app = express();

// CORS with specific settings (optional)
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // Adjust for security
  credentials: true,
}));

app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Clothing Store API');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// Handle unexpected errors
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
