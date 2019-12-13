
const Product = require('../models/product');
const Cart = require('../models/cart');

// ============================= 
//        => /GET Routes
// =============================

// NOTES:
// All paths seen relative from inside the views folder

exports.getShopIndex = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Welcome To Node Shop!',
            path: '/',
        });
    }); // !! This is the (cb) function that's passed into the fetchAll() method within the products model !!
};

exports.getShopProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    }); // !! This is the (cb) function that's passed into the fetchAll() method within the products model !!
};

exports.getShopSingleProduct = (req, res, next) => {
    const prodId = req.params.productId; // <= Must be the same variable as in the router
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            product: product,
            path: '/products'
        });
    });
};

exports.getShopCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Shopping Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
}

exports.getShopOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
}

exports.getShopCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout Page',
        path: '/checkout'
    });
}

// ============================= 
//        => /POST Routes
// =============================

exports.postShopCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};