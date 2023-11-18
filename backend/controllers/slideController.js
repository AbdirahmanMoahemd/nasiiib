import asyncHandler from "express-async-handler";
import Slide from "../models/slidesModel.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getSlides = asyncHandler(async (req, res) => {
  const slides = await Slide.find({}).sort({ createdAt: -1 });

  res.json(slides);
});

// @desc    Delete by Id
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteSlide = asyncHandler(async (req, res) => {
  const slides = await Slide.findById(req.params.id);

  if (slides) {
    await slides.remove();
    res.json({ message: "Slide removed" });
  } else {
    res.status(404);
    throw new Error("Slide not found");
  }
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getSlideById = asyncHandler(async (req, res) => {
  const slides = await Slide.findById(req.params.id);

  if (slides) {
    res.json(slides);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const createSlide = asyncHandler(async (req, res) => {
  let slide = new Slide({
    images: req.body.images,
  });
  slide = await slide.save();

  if (!slide) return res.status(400).send("the slide cannot be created!");

  res.send(slide);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateslides = asyncHandler(async (req, res) => {
  const { images } = req.body;

  const slides = await Slide.findById(req.params.id);

  if (slides) {
    slides.images = images;

    const updatedslides = await slides.save();
    res.json({
      updatedslides,
    });
  } else {
    res.status(404);
    throw new Error("slides Not Found");
  }
});
