import asyncHandler from "express-async-handler";
import SubCategory from "../models/subcategoryModels.js";

// @desc    Fetch all subcategories
// @route   Get /api/subcategories/
// @access  Public
export const getSubCategories = asyncHandler(async (req, res) => {
  const subcategories = await SubCategory.find().populate("category");

  if (!subcategories) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ subcategories });
});


// @desc    Fetch subcategory by id
// @route   Get /api/subcategories/:id
// @access  Public
export const getSubCategoryById = asyncHandler(async (req, res) => {
  const subcategory = await SubCategory.findById(req.params.id).populate(
    "category"
  );

  if (subcategory) {
    res.json(subcategory);
  } else {
    res.status(404);
    throw new Error("subcategory Not Found");
  }
});


// @desc    Fetch all subcategories
// @route   Get /api/subcategories/
// @access  Public
export const getSubCategories2 = asyncHandler(async (req, res) => {
  try {
    const subcategories = await SubCategory.find({}).populate("category");
    res.json(subcategories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const getSubCategoryByCategory = asyncHandler(async (req, res) => {
  try {
    const { query } = req.body;
    let subcategory = await SubCategory.find({ category: query })
    .populate("category")

    if (subcategory) {
      subcategory.sort((a, b) => (a._id > b._id ? -1 : 1));
      res.json(subcategory);
    } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// @desc    create subcategory
// @route   POST /api/subcategories/
// @access  Private/Admin
export const createSubCategory = asyncHandler(async (req, res) => {
  let subcategory = new SubCategory({
    name: req.body.name,
    category: req.body.category,
  });
  subcategory = await subcategory.save();

  if (!subcategory)
    return res.status(400).send("the subcategory cannot be created!");

  res.send(subcategory);
});

// @desc    update SubCategory
// @route   PUT /api/subcategories/
// @access  Private/Admin
export const updateSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subcategory = await SubCategory.findById(req.params.id);

  if (subcategory) {
    subcategory.name = name;
    subcategory.category = category;

    const updatedSubCategory = await subcategory.save();
    res.json(updatedSubCategory);
  } else {
    res.status(404);
    throw new Error("subcategory Not Found");
  }
});

// @desc    Delete SubCategory
// @route   DELETE /api/subcategories/
// @access  Private/Admin
export const deleteSubCategory = asyncHandler(async (req, res) => {
  SubCategory.findByIdAndRemove(req.params.id)
    .then((subcategory) => {
      if (subcategory) {
        return res
          .status(200)
          .json({ success: true, message: "the subcategory is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "subcategory not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});
