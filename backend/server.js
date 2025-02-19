import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";

config();
connectDB();

const app = express();
app.use(cors());
app.use(json());

app.use('/products', productRoutes);
app.use("/categories", categoryRoutes);
app.use('/auth', authRoutes);
app.use("/admin", adminRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Clothing Store API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
