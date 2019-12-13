
const fs = require('fs');
const path = require('path');

const productData = path.join(
    path.dirname(process.mainModule.filename),
    //Grabs from 'data' folder...
    'data',
    // ...from a json file
    'cart.json'
); 

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch previous product
        fs.readFile(productData, (err, fileContent) => {
            // 'cart' is an empty array and '0' price || the values within the cart.json file
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Replace The product in cart, if it exists
            if (existingProduct) {
                // Breaks the object into variables for each value
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            // Create The product in cart, if it exists
            } else {
                updatedProduct = { id: id, qty: 1 };
                // Creates an array with all products within cart
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice; //extra '+' converts productPrice to a number
            fs.writeFile(productData, JSON.stringify(cart), err => {
                console.log(err);
            }); 
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(productData, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(productData, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getProducts(cb) {
        fs.readFile(productData, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}