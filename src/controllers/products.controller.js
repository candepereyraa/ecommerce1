import ProductService from '../services/ProductService.js';
const productService = new ProductService();

export async function listProducts(req, res) {
  try {
    const prods = await productService.list();
    res.json(prods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProduct(req, res) {
  try {
    const p = await productService.getById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createProduct(req, res) {
  try {
    const p = await productService.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const p = await productService.update(req.params.id, req.body);
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    await productService.remove(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
