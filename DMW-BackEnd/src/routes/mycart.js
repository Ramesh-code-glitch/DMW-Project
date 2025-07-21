// routes/mycart.js
const express = require('express');
const Cart = require('../models/Cart');  // Assuming the Cart model is correctly defined
const router = express.Router();

// Add product to cart
router.post('/add', async (req, res) => {
  const { userId, product } = req.body; // Accepting userId from the body
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already exists in the cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === product.productId);

    if (existingItemIndex >= 0) {
      // If product exists, increment the quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // Add new product to cart
      cart.items.push(product);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error adding product to cart' });
  }
});

// Get user's cart
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

// Remove product from cart
router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error removing product from cart' });
  }
});

module.exports = router;
