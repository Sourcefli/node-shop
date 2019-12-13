const express = require('express');
const path = require('path');

const router = express.Router();

//Controller Imports
const adminController = require('../controllers/admin');

// '/admin/{route}' => GET
// STATIC
router.get('/products', adminController.getAdminProducts);
router.get('/add-product', adminController.getAddProduct);

// DYNAMIC
router.get('/edit-product/:productId', adminController.getEditProduct);

//==== '/admin/{route}' => POST
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;

// Multiple Exports Syntax
// exports.routes = router;
// exports.helpers = helpers;
