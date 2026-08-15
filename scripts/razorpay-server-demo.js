/**
 * Velnora Studio - Razorpay Integration Backend Demo Server
 * 
 * This is an optional backend script showing how to:
 * 1. Create a secure Order ID on your server using the Razorpay API.
 * 2. Securely verify payment signatures using SHA256 HMAC after capture.
 * 
 * Setup:
 * 1. Initialize npm and install dependencies:
 *    npm install express cors dotenv
 *    (For official SDK: npm install razorpay)
 * 2. Run the server:
 *    node scripts/razorpay-server-demo.js
 */

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const http = require('https'); // built-in Node https module to avoid heavy SDK dependencies
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Load keys from environment
const PORT = process.env.PORT || 5000;
const KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID_HERE';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET_HERE';

/**
 * Endpoint to create a Razorpay Order
 * Triggered on Proceed to Payment in the Cart Drawer.
 */
app.post('/api/create-order', (req, res) => {
  const { amount } = req.body; // amount is in INR
  if (!amount) {
    return res.status(400).json({ success: false, message: 'Amount is required' });
  }

  // Convert amount to paise (1 INR = 100 Paise)
  const amountInPaise = Math.round(amount * 100);
  const currency = 'INR';
  const receipt = `rcpt_${Math.floor(Date.now() / 1000)}_${Math.floor(Math.random() * 1000)}`;

  // Construct request payload
  const postData = JSON.stringify({
    amount: amountInPaise,
    currency,
    receipt,
  });

  // Prepare Razorpay Basic Auth Header
  const authHeader = 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');

  const options = {
    hostname: 'api.razorpay.com',
    port: 443,
    path: '/v1/orders',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      'Authorization': authHeader
    }
  };

  // Perform Request to Razorpay Orders API
  const razorpayRequest = http.request(options, (razorpayResponse) => {
    let body = '';
    razorpayResponse.on('data', (chunk) => body += chunk);
    razorpayResponse.on('end', () => {
      try {
        const orderData = JSON.parse(body);
        if (razorpayResponse.statusCode === 200) {
          res.json({
            success: true,
            order: {
              id: orderData.id,
              amount: orderData.amount,
              currency: orderData.currency
            }
          });
        } else {
          console.error("Razorpay Error Body:", orderData);
          res.status(500).json({
            success: false,
            message: orderData.error ? orderData.error.description : 'Failed to create order'
          });
        }
      } catch (err) {
        res.status(500).json({ success: false, message: 'Parsing error from gateway API' });
      }
    });
  });

  razorpayRequest.on('error', (e) => {
    console.error("HTTPS Request Error:", e);
    res.status(500).json({ success: false, message: 'Failed to reach Razorpay API' });
  });

  razorpayRequest.write(postData);
  razorpayRequest.end();
});

/**
 * Endpoint to verify payment signatures
 * Triggered automatically by Razorpay Checkout's success callback.
 */
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Verification details missing' });
  }

  // Create HMAC SHA256 using the key secret
  const hmac = crypto.createHmac('sha256', KEY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest('hex');

  // Verify signature validity
  if (generatedSignature === razorpay_signature) {
    res.json({
      success: true,
      message: 'Payment verified successfully.'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment verification failed (signature mismatch).'
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` Velnora Studio - Razorpay Verification Server running`);
  console.log(` Endpoint URL: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
