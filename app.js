const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Express App 
const app = express();

//Template Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Route Files
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/httpErrors');

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Route Groups
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404 
app.use(errorController.get404);

app.listen(4001, () => console.log("Listening on 4001"))