import express from 'express';
import authRoutes from './routes/auth.routes.js'; // <-- ruta correcta
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';

const app = express();
app.use(express.json());

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.get('/', (req, res) => res.json({ ok: true, msg: 'Ecommerce API' }));

export default app;


