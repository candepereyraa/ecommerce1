import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Ticket from '../models/Ticket.js';

// crear carrito (lo dejamos simple: vacío o con owner si querés)
export async function createCart(req, res) {
  try {
    const cart = await Cart.create({ products: [] , owner: req.user?._id || null });
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCart(req, res) {
  try {
    const cart = await Cart.findById(req.params.id).populate('products.product').lean();
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addProductToCart(req, res) {
  try {
    const { id, pid } = req.params;
    const qty = Number(req.body.qty || 1);
    const cart = await Cart.findById(id);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const product = await Product.findById(pid);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const existing = cart.products.find(p => String(p.product) === String(pid));
    if (existing) existing.quantity += qty;
    else cart.products.push({ product: pid, quantity: qty });

    await cart.save();
    const updated = await Cart.findById(id).populate('products.product').lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Lógica de compra: verifica stock, decrementa, genera ticket y deja en el carrito los no comprados
export async function purchaseCart(req, res) {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const bought = [];
    const notBought = [];
    let total = 0;

    for (const item of cart.products) {
      const prod = await Product.findById(item.product._id);
      if (prod && prod.stock >= item.quantity) {
        prod.stock -= item.quantity;
        await prod.save();
        bought.push({ product: prod._id, quantity: item.quantity, price: prod.price });
        total += prod.price * item.quantity;
      } else {
        notBought.push(item);
      }
    }

    let ticket = null;
    if (bought.length > 0) {
      ticket = await Ticket.create({
        code: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
        amount: total,
        purchaser: req.user?.email || 'guest',
        purchase_datetime: new Date()
      });
    }

    // actualizar carrito: dejar solo notBought
    cart.products = notBought.map(i => ({ product: i.product._id || i.product, quantity: i.quantity }));
    await cart.save();

    res.json({ ticket, notBought });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
