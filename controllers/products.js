const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        productCss: true,
        formsCss: true,
        activeAddProducts: true
    });
};

exports.postAddProduct = (req, res, next) => {
    //Sending the form data to the class constructor
    const product = new Product(req.body.title);
    //Have to save!!
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Node Shop!',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            activeAddProducts: true
        });
    }); // !! This is the (cb) function that's passed into the fetchAll() method within the products model !!
};