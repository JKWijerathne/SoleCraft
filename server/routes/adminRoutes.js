import express from 'express';
import { protect, adminOnly } from '../middleware/adminMiddleware.js';
import {
  // Dashboard
  getDashboardStats,

  // Users
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,

  // Products
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,

  // Orders
  getAllOrders,
  markOrderAsDelivered,
  deleteOrder,
} from '../controllers/adminController.js';

const router = express.Router();

// Apply protect + adminOnly to every route in this router
router.use(protect, adminOnly);

// ─── Dashboard ────────────────────────────────────────────────
router.get('/stats', getDashboardStats);

// ─── Users ────────────────────────────────────────────────────
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// ─── Products ─────────────────────────────────────────────────
router.route('/products')
  .get(getAllProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

// ─── Orders ───────────────────────────────────────────────────
router.route('/orders')
  .get(getAllOrders);

router.route('/orders/:id/deliver')
  .put(markOrderAsDelivered);

router.route('/orders/:id')
  .delete(deleteOrder);

export default router;
