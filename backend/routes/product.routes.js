import express from 'express';
import { createProductController, deleteProductController, getAllProductsController, getSingleProductController, updateProductController } from '../controllers/product.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../services/multer.js';


export const router = express.Router();

router.post("/create",authMiddleware,upload.array("images",3),createProductController);
router.get("/",getAllProductsController);
router.get("/:product_id",getSingleProductController);
router.put("/update/:product_id",authMiddleware,updateProductController);
router.delete("/delete/:product_id",authMiddleware,deleteProductController);