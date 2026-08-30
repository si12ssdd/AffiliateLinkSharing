const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeMiddleware');
const paymentController = require('../controllers/paymentController');

router.post('/webhook', express.raw({ type: 'application/json' }),
    paymentController.handleWebhookEvent);

router.use(authMiddleware.protect);

router.post('/create-order', authorize('payment:create'), paymentController.createOrder);
router.post('/verify-order', authorize('payment:create'), paymentController.verifyOrder);
router.post('/create-subscription', authorize('payment:create'), paymentController.createSubscription);
router.post('/verify-subscription', authorize('payment:create'), paymentController.verifySubscription);
router.post('/cancel-subscription', authorize('payment:create'), paymentController.cancelSubscription);

module.exports = router;