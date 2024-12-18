const orderService = require("../services/orderService");

// Route to create an order from the cart
const createOrderFromCart = async (req, res) => {
  const userId = req.user.id;
  console.log("userId", userId);
  try {
    const order = await orderService.createOrderFromCart(userId);
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await orderService.getOrders(userId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Get All order
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllOrders, getOrders, createOrderFromCart };
