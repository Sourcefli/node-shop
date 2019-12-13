const path = require('path');
const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// ====================== 
//      GET Routes 
// ======================

// STATICS - must come first
router.get('/', shopController.getShopIndex);
router.get('/products', shopController.getShopProducts);
router.get('/cart', shopController.getShopCart);
router.get('/orders', shopController.getShopOrders);
router.get('/checkout', shopController.getShopCheckout);

// DYNAMICS
router.get('/products/:productId', shopController.getShopSingleProduct);

// ====================== 
//      POST Routes 
// ======================

router.post('/cart', shopController.postShopCart);


module.exports = router;