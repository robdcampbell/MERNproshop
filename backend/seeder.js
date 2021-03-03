import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear out database before import
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Import Users - put them into array called createdUser
    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;
    // Add the admin user who added the product to the DB
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear out database before import
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
