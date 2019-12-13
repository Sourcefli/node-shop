const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

//Sets path for /data/products.json file
const productData = path.join(
    path.dirname(process.mainModule.filename),
    //Grabs from 'data' folder...
    'data',
    // ...from a json file
    'products.json'
); 

//Reads data from /data/products.json file, using path function (above)
const getProductsFromFile = cb => {
    fs.readFile(productData, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

//Product class, exported as a global module
module.exports = class Product {
    
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                //If product already has an id
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                //pulls out all existing products and puts them in a new array
                const updatedProducts = [...products];
                //While this object is being instantiated, it's new id will replace the old, with 'this'
                updatedProducts[existingProductIndex] = this;
                //Writes the currently instantiated object to the file
                fs.writeFile(productData, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                // !! 'this' only works in this context with ES6 syntax
                products.push(this);
                fs.writeFile(productData, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    //!! static allows for this method to be called without instantiating this class. Since fetchAll() is not creating any new product, just getting all products, it doesn't need to instantiate this class !!
    //!! IMPORTANT
    // This, without the (cb) parameter, returns an error which is because this is a sync function. The (cb) parameter is passing a function into this function and provides callback function which returns the data of this file
    // end IMPORTANT!!
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(productData => productData.id === id);
            cb(product);
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            //Get the id so we can use later for knowing the price of deleted product
            const product = products.find(prod => prod.id === id);
            
            //Filter for all products that aren't equal to this one's id
            const updatedProducts = products.filter(prod => prod.id !== id);
            
            //Write a new file with the new filtered array
            fs.writeFile(productData, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    //pass in id and price, extracted from above
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
}