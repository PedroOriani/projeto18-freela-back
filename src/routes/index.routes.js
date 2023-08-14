import { Router } from 'express';
import sessionRouter from './session.routes.js';
import productRouter from './product.routes.js';

const router = Router()

router.use(sessionRouter);
router.use(productRouter);

export default router;