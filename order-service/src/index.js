const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27019/order_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [{ productId: Number, quantity: Number, price: Number }],
});
const Cart = mongoose.model('Cart', cartSchema);

app.get('/api/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/cart/:userId', async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
    }
    cart.items.push({ productId, quantity, price });
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3003, () => console.log('Order service running on port 3003'));
