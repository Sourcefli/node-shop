const fs = require('fs');
const path = require('path');

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
    
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(products => {
            // !! 'this' only works in this context with ES6 syntax
            products.push(this);
            fs.writeFile(productData, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    //!! static allows for this method to be called without instantiating this class. Since fetchAll() is not creating any new product, just getting all products, it doesn't need to instantiate this class !!
    //!! IMPORTANT
    // This, without the (cb) parameter, returns an error which is because this is a sync function. The (cb) parameter is passing a function into this function and provides callback function which returns the data of this file
    // end IMPORTANT!!
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}