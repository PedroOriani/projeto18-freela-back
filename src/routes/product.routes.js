import { Router } from "express";
import { addProduct, deleteProduct, getMyProducts, getProductById, getProducts } from "../controllers/product.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { productSchema } from "../schemas/product.schema.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const productRouter = Router();

productRouter.post('/product', validateAuth, validateSchema(productSchema), addProduct)
productRouter.get('/products', getProducts)
productRouter.get('/products/:id', getProductById)
productRouter.get('/products/me', validateAuth, getMyProducts)
productRouter.delete('/products/me', validateAuth, deleteProduct)

export default productRouter