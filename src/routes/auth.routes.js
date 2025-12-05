import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const router = Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
    console.log('POST /register recibido', req.body); // <-- verifica si llega
    authController.register(req, res);
});

// POST /api/auth/login
router.post('/login', (req, res) => authController.login(req, res));

// GET /api/auth/current
router.get('/current', (req, res) => authController.current(req, res));

export default router;
