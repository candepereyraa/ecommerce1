import { Router } from 'express';
import passport from 'passport';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { onlyAdmin } from '../middlewares/rolesMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', passport.authenticate('jwt', { session: false }), onlyAdmin, createProduct);
router.put('/:id', passport.authenticate('jwt', { session: false }), onlyAdmin, updateProduct);
router.delete('/:id', passport.authenticate('jwt', { session: false }), onlyAdmin, deleteProduct);

export default router;
