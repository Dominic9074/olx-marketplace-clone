import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createProductController, getProductsController } from "../controllers/productController";

const router=Router();

router.get('/products',getProductsController)
router.post('/addProduct',authenticate,createProductController)

export default router;