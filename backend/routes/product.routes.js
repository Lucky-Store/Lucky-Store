require("dotenv").config();
const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dhgiqtzpr",
  api_key: "873942994598248",
  api_secret: "lAukkePcQK-uFgkwp9vOMpIYdqs",
});

router.get("/products", async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({ _id: id });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const data = await Order.find();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/order", async (req, res) => {
  try {
    const { order, logo } = req.body;
    if (logo) {
      const { url } = await cloudinary.uploader.upload(logo);
      const res = await Order.create({ ...order, logo: url });
      res.status(200).json({ res });
    } else {
      const res = await Order.create({ ...order, logo: null });
      res.status(200).json({ res });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.delete("/order", async (req, res) => {
  try {
    const { id } = req.body;
    const res = await Order.deleteOne({ _id: id });
    res.status(200).json({ res });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
