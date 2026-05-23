import crypto from 'crypto';

// @desc    Generate PayHere Hash
// @route   POST /api/payhere/hash
// @access  Private
export const generatePayHereHash = async (req, res) => {
  try {
    const { orderId, amount, currency } = req.body;
    
    if (!orderId || !amount || !currency) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const merchantId = process.env.PAYHERE_MERCHANT_ID?.trim();
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET?.trim();

    if (!merchantId || !merchantSecret) {
      return res.status(500).json({ message: 'PayHere credentials not configured' });
    }

    const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
    const amountFormatted = parseFloat(amount).toFixed(2);
    
    const hashString = `${merchantId}${orderId}${amountFormatted}${currency}${hashedSecret}`;
    const hash = crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();

    res.json({ hash, merchantId, env: process.env.PAYHERE_ENV || 'sandbox' });
  } catch (error) {
    console.error('Failed to generate PayHere hash:', error);
    res.status(500).json({ message: 'Failed to generate PayHere hash' });
  }
};
