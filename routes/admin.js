const express = require('express');
const path = require('path');

const router = express.Router();

//Controller Imports
const productsController = require('../controllers/products');

//===== /admin/... => GET
router.get('/add-product', productsController.getAddProduct);

//==== /admin/... => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;

// Multiple Exports Syntax
// exports.routes = router;
