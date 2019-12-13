
const Product = require('../models/product');

// ============================= 
//        => /GET Routes
// =============================

// NOTES:
// All paths seen relative from inside the views folder

exports.getAdminProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: 'admin/products',
        });
    }); // !! This is the (cb) function that's passed into the fetchAll() method within the products model !!
};

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

// EDIT Products
exports.getEditProduct = (req, res, next) => {
    //Gets the value of 'editMode' (as a string) query params so it can be called from within the object
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

// ============================= 
//        => /POST Routes
// =============================

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    //Sending the form data to the class constructor
    const product = new Product(null, title, imageUrl, price, description);
    //Have to save!!
    product.save();
    res.redirect('/admin/products');
};

exports.postEditProduct = (req, res, next) => {
    //get id from the form (form must pass as hidden input)
    const prodId = req.body.productId;
    //Fetch info for the product
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    //create new product instance, populate it with the new info
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedPrice,
        updatedDescription
    );
    //then call save
    updatedProduct.save();
    res.redirect('/admin/products');
};


exports.postDeleteProduct = (req, res, next) => {
    //get product id
    const prodId = req.body.productId;
    //Find id then get Index to send to delete method
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};