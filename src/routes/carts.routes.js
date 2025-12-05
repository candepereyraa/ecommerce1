import { Router } from 'express';
import passport from 'passport';
import { createCart, getCart, addProductToCart, purchaseCart } from '../controllers/carts.controller.js';
import { onlyAdmin, onlyUser, ownerOrAdmin } from '../middlewares/rolesMiddleware.js';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createCart);
router.get('/:id', passport.authenticate('jwt', { session: false }), ownerOrAdmin, getCart);
router.post('/:id/product/:pid', passport.authenticate('jwt', { session: false }), ownerOrAdmin, addProductToCart);
router.post('/:id/purchase', passport.authenticate('jwt', { session: false }), ownerOrAdmin, purchaseCart);

export default router;
