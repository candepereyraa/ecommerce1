import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
products: [
{
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
quantity: { type: Number, default: 1 }
}
],
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


export default mongoose.model('Cart', cartSchema);