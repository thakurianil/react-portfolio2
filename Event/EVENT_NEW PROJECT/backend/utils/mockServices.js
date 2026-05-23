const crypto = require('crypto');

const mockServices = {
  // Mock Stripe
  createPaymentIntent: async (amount, currency = 'usd') => {
    console.log(`[Mock Stripe] Creating intent for ${amount} ${currency}.`);
    return { clientSecret: 'mock_sk_' + crypto.randomBytes(8).toString('hex'), id: 'pi_' + crypto.randomBytes(8).toString('hex') };
  },

  // Mock Vonage SMS
  sendSMS: async (to, text) => {
    console.log(`[Mock Vonage] Sending SMS to ${to}: ${text}`);
    return { status: 'sent', messageId: crypto.randomBytes(8).toString('hex') };
  },

  // Mock AWS S3
  uploadFile: async (file) => {
    const mockUrl = `https://mock-s3-bucket.s3.amazonaws.com/${Date.now()}_${file.originalname}`;
    console.log(`[Mock S3] Uploaded file, returning mock URL: ${mockUrl}`);
    return mockUrl;
  },

  // Mock SMTP
  sendEmail: async (to, subject, html) => {
    console.log(`\n============== [Mock SMTP] ==============`);
    console.log(`To: ${to}\nSubject: ${subject}\nContent:\n${html}`);
    console.log(`=========================================\n`);
    return { success: true };
  },

  // Mock reCAPTCHA
  verifyCaptcha: async (token) => {
    console.log(`[Mock reCAPTCHA] Verifying token ${token}... Verified default true.`);
    return true; // We always say it's valid for testing
  }
};

module.exports = mockServices;
