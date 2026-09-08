import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createProductController, getProductsController } from "../controllers/productController";

const router=Router();

router.post('/addProduct',authenticate,createProductController)
router.get('/products',getProductsController)

export default router;