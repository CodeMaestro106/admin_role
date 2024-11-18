// server.js
const express = require("express");
const cors = require("cors");

// set init information
require("dotenv").config();

// db setting
const { connectDB } = require("./config/database");

// route setting
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const orderRoutes = require("./routes/orderRoutes");
// model setting
const User = require("./models/User");
const Role = require("./models/Role");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Favorite = require("./models/Favorite");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

// insert utils such as role initialize
const initializeRoles = require("./utils/initRoles");
const initializeAdminUsers = require("./utils/initAdminUser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user route
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// product route
app.use("/product", productRoutes);
app.use("/category", categoryRoutes);

// cart route
app.use("/cart", cartRoutes);

// favorite route
app.use("/favorite", favoriteRoutes);

// order route
app.use("/order", orderRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully.");

    // Initialize models in order
    await Role.sync();
    console.log("Role table created.");

    await User.sync();
    console.log("User table created.");

    await Category.sync();
    console.log("Category table created.");

    await Product.sync();
    console.log("Product table created.");

    await Cart.sync();
    console.log("Cart table created.");

    await CartItem.sync();
    console.log("CartItem table created.");

    await Favorite.sync();
    console.log("Favorite table created.");

    await Order.sync();
    console.log("Order table created.");

    await OrderItem.sync();
    console.log("OrderItem table created.");

    // Seed initial data
    await initializeRoles();
    await initializeAdminUsers();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
};

startServer();
