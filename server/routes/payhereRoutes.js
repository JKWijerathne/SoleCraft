import express from 'express';
import { generatePayHereHash } from '../controllers/payhereController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/hash', protect, generatePayHereHash);

export default router;
