
import Order from '../models/Order.js';

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL } = process.env;

// Function to generate an access token
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw error;
  }
};

// @desc    Create PayPal Order
// @route   POST /api/payments/paypal/create-order/:orderId
// @access  Private
export const createPayPalOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Read the exact order total from MongoDB
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_API_URL}/v2/checkout/orders`;
    // Convert LKR to USD since PayPal does not support LKR directly.
    // Using an approximate conversion rate of 1 USD = 300 LKR.
    const exchangeRate = 300;
    const amountInUSD = (order.totalPrice / exchangeRate).toFixed(2);

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amountInUSD,
          },
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Error creating PayPal order');
    }
    
    // Return PayPal orderID to frontend
    res.json({ id: data.id });
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

// @desc    Capture PayPal Order
// @route   POST /api/payments/paypal/capture-order/:orderId
// @access  Private
export const capturePayPalOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paypalOrderId } = req.body;

    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_API_URL}/v2/checkout/orders/${paypalOrderId}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error capturing PayPal order');
    }

    if (data.status === 'COMPLETED') {
        // Update MongoDB Order
        const order = await Order.findById(orderId);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: data.id,
                status: data.status,
                update_time: data.update_time,
                email_address: data.payer?.email_address,
            };
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } else {
        res.status(400).json({ message: 'Payment not completed', details: data });
    }

  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};
