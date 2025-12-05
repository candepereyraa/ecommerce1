import ProductDAO from '../daos/ProductDAO.js';


export default class CartService{
constructor(cartRepo, productDao){
this.cartRepo = cartRepo;
this.productDao = productDao; // to check stock
}


async addProduct(cartId, productId, qty=1){
const cart = await this.cartRepo.get(cartId);
if(!cart) throw new Error('Cart not found');


const prod = cart.products.find(p => String(p.product._id) === String(productId));
if(prod) prod.quantity += qty;
else cart.products.push({ product: productId, quantity: qty });


await this.cartRepo.update(cartId, { products: cart.products });
return await this.cartRepo.get(cartId);
}


async purchase(cartId, purchaserId, ticketService){
const cart = await this.cartRepo.get(cartId);
if(!cart) throw new Error('Cart not found');


// verificar stock y separar los comprados de los no comprados
const bought = [];
const notBought = [];
let total = 0;


for(const item of cart.products){
const product = await this.productDao.getById(item.product._id);
if(product && product.stock >= item.quantity){
// reduce stock
product.stock -= item.quantity;
await this.productDao.update(product._id, { stock: product.stock });
bought.push({ product: product._id, quantity: item.quantity, price: product.price });
total += product.price * item.quantity;
} else {
notBought.push(item);
}
}


// generar ticket si compró al menos 1 producto
let ticket = null;
if(bought.length > 0){
ticket = await ticketService.createTicket(purchaserId, total, bought);
}


// actualizar carrito: dejar solo notBought
await this.cartRepo.update(cartId, { products: notBought });


return { ticket, notBought };
}
}