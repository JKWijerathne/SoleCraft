import express from 'express';
import { createPayPalOrder, capturePayPalOrder } from '../controllers/paypalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order/:orderId', protect, createPayPalOrder);
router.post('/capture-order/:orderId', protect, capturePayPalOrder);

export default router;
