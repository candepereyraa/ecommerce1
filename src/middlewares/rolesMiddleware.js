import Cart from '../models/Cart.js';

// solo admin
export function onlyAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  next();
}

// solo user (si necesitás)
export function onlyUser(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== 'user') return res.status(403).json({ error: 'Forbidden' });
  next();
}

// owner o admin para cart actions
export async function ownerOrAdmin(req, res, next) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (req.user.role === 'admin') return next();

    const cartId = req.params.id;
    if (!cartId) return res.status(400).json({ error: 'Cart id missing' });

    const cart = await Cart.findById(cartId).lean();
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    // si existe owner en modelo
    if (cart.owner) {
      if (String(cart.owner) !== String(req.user._id)) return res.status(403).json({ error: 'Forbidden' });
      return next();
    }

    // si no hay owner definido, permitimos al user (fallback)
    return next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
