import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from 'colors'
import morgan from "morgan";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMidlleware.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'
import categoriesRoutes from "./routes/cetegoryRoutes.js";
import subCategoriesRoutes from "./routes/subCategoriesRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";




dotenv.config();
connectDB();
const app = express(); 

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/category', categoriesRoutes)
app.use('/api/subcategory', subCategoriesRoutes)
app.use('/api/products', productRoutes)
app.use("/api/cart", cartRoutes)






const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runnin...");
  });
}




app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);
