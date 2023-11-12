import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser2 = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      cart: user.cart,
      wishlist: user.wishlist,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: "Invalid email or password" });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfileById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("cart.product")
    .populate("wishlist.product");
  const { token } = req.body;

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      token,
      cart: user.cart,
      wishlist: user.wishlist,
    });
  } else {
    res.status(404).json({ msg: "User Not Found" });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser2 = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, city, country } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ msg: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    city,
    country,
  });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile2 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("cart.product")
    .populate("wishlist.product");
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;
    user.isAdmin = user.isAdmin;
    user.token = user.token;
    user.cart = user.cart;
    user.wishlist = user.wishlist;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      country: updatedUser.country,
      token: updatedUser.token,
      cart: updatedUser.cart,
      wishlist: updatedUser.wishlist,
    });
  } else {
    res.status(404).json({ msg: "User Not Found" });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      country: updatedUser.country,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const updateUserPasswordApp = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("cart.product")
  .populate("wishlist.product");;

  if (user) {
    user.password = req.body.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      city: updatedUser.city,
      country: updatedUser.country,
      token: updatedUser.token,
      cart: updatedUser.cart,
      wishlist: updatedUser.wishlist,
    });
  } else {
    res.status(404).json({ msg: "User Not Found" });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  users.sort((a, b) => (a._id > b._id ? -1 : 1));
  res.json(users);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsersCount = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false });

  let counter3 = 0;
  for (let i = 0; i < users.length; i++) {
    counter3++;
  }

  res.json({ counter3 });
});

// @desc    Delete by Id
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById2 = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const forgottUserPassword = asyncHandler(async (req, res) => {
  const { email, phone } = req.body;

  let user = await User.findOne({ email, phone });
  if (user) {
    res.json(user);
  } else if (!user) {
    return res
      .status(400)
      .json({ msg: "User with this email and phone does not exist!" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// save user address
export const saveUserAddress = asyncHandler(async (req, res) => {
  try {
    const { address, city, country } = req.body;
    let user = await User.findById(req.user);
    user.address = address;
    user.city = city;
    user.country = country;
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
