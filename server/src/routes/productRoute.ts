import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createProductController, getProductsController, updateProductController } from "../controllers/productController";

const router=Router();

router.get('/products',getProductsController)
router.post('/addProduct',authenticate,createProductController)
router.put('/editProduct:id',authenticate,updateProductController)

export default router;