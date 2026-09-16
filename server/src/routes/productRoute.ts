import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import { completePurchaseController, createProductController, deleteProductController, getProductByIdController, getProductsController, updateProductController } from "../controllers/productController";

const router=Router();

router.get('/products',getProductsController)
router.get('/products/:id',getProductByIdController)
router.post('/addProduct',authenticate,createProductController)
router.put('/editProduct/:id',authenticate,updateProductController)
router.delete('/deleteProduct/:id',authenticate,deleteProductController)
router.patch('/product/purchase',authenticate,completePurchaseController)

export default router;