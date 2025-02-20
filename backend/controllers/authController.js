import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = "your_secret_key"; // Store in .env

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Default role to "user" if not provided
    const assignedRole = role || "user";

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    });

    // Generate token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Log the request body to debug
  console.log("Request Body:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    //console.error("Login Error:", error); // Log the exact error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
