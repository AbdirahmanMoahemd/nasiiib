import asyncHandler from "express-async-handler";
import Product from "../models/productModels.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  let pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword, isFeatured: true })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  products.sort((a, b) => (a._id > b._id ? -1 : 1));

  res.json({ products, count });
});

export const getByAdminProducts = asyncHandler(async (req, res) => {
  let pageSize = 50;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate("category")
    .populate("subcategory")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ products, count });
});

export const getProductsByApp = asyncHandler(async (req, res) => {
  try {
    let pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword, isFeatured: true })
      .populate("category")
      .populate("subcategory")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getTopProductsByApp = asyncHandler(async (req, res) => {
  try {
    // let pageSize = 5;
    // const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword, isFeatured: true })
      .populate("category")
      .populate("subcategory")
      .limit(30)
      .sort({ rating: -1 })


    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export const getNewProductsByApp = asyncHandler(async (req, res) => {
  try {
    // let pageSize = 5;
    // const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword, isFeatured: true })
      .populate("category")
      .populate("subcategory")
      .limit(30)
      .sort({ createdAt: -1 });


    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getProductsByCategoryByApp = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({
      isFeatured: true,
      category: req.body.category,
    })
      .populate("category")
      .populate("subcategory")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getProductsByname = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
      isFeatured: true,
    });
    if (products) {
      res.json(products);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("subcategory");

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Delete a product
// @route   GET /api/product/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Product removed",
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    images: req.body.images,
    colors: req.body.colors,
    sizes: req.body.sizes,
    brand: req.body.brand,
    category: req.body.category,
    subcategory: req.body.subcategory,
    description: req.body.description,
    mainDescription: req.body.mainDescription,
    price: req.body.price,
    isDiscounted: req.body.isDiscounted,
    newPrice: req.body.newPrice,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    images,
    colors,
    sizes,
    description,
    mainDescription,
    brand,
    category,
    subcategory,
    price,
    isDiscounted,
    newPrice,
    countInStock,
    isFeatured,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.images = images;
    product.colors = colors;
    product.sizes = sizes;
    product.description = description;
    product.mainDescription = mainDescription;
    product.brand = brand;
    product.category = category;
    product.subcategory = subcategory;
    product.isFeatured = isFeatured;
    product.price = price;
    product.isDiscounted = isDiscounted;
    product.newPrice = newPrice;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json({
      updatedProduct,
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
