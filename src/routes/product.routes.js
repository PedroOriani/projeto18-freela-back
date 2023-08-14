import { Router } from "express";
import { addProduct, deleteProduct, getMyProducts, getProductById, getProducts } from "../controllers/product.controllers.js";

const productRouter = Router();

productRouter.post('/product', addProduct)
productRouter.get('/products', getProducts)
productRouter.get('/products/:id', getProductById)
productRouter.get('/products/me', getMyProducts)
productRouter.delete('/products/me', deleteProduct)

export default productRouter