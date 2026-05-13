import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;