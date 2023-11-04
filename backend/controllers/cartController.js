import asyncHandler from "express-async-handler";
import Product from "../models/productModels.js";
import User from "../models/userModel.js";

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const addToCart = asyncHandler(async (req, res) => {
  try {
    const { id, name, images, price, colors, sizes } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user) 
      .populate("cart.product")
      .populate("wishlist.product");

    if (user.cart.length == 0) {
      user.cart.push({
        product,
        quantity: 1,
        name,
        images,
        price: product.price,
        sizes,
        colors,
      });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let producttt = user.cart.find((productt) =>
          productt.product._id.equals(product._id)
        );
        producttt.quantity += 1;
      } else {
        user.cart.push({
          product,
          quantity: 1,
          name,
          images,
          price,
          sizes,
          colors,
        });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user)
      .populate("cart.product")
      .populate("wishlist.product");

    if (user.wishlist.length == 0) {
      user.wishlist.push({ product });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.wishlist.length; i++) {
        if (user.wishlist[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        return res.status(400).json({ msg: "already added" });
      } else {
        user.wishlist.push({ product });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const removeCartItem = asyncHandler(async (req, res) => {
  try {
    const { index } = req.body;
    let user = await User.findById(req.user)
      .populate("cart.product")
      .populate("wishlist.product");

    user.cart.splice(index, 1);

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const removeWishlistItem = asyncHandler(async (req, res) => {
  try {
    const { index } = req.body;
    let user = await User.findById(req.user)
      .populate("cart.product")
      .populate("wishlist.product");

    user.wishlist.splice(index, 1);

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch all categories
// @route   POST /api/categorie/
// @access  Public
export const deleteCart = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.user)
      .populate("cart.product")
      .populate("wishlist.product");
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
