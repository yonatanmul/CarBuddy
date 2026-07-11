const express = require('express');
const path = require('path');
const session = require('express-session');


const app = express();


const authRoutes = require('./routes/auth');
const treatmentsRoutes = require('./routes/treatments');
const pricesRoutes = require('./routes/prices');
const carsRoutes = require('./routes/cars');
const adminRoutes = require('./routes/admin');


app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
   secret: 'carbuddy_secret_key_8f3kd92ja7',
   saveUninitialized: false,
   resave: false
}));


app.use((req, res, next) => {
   res.locals.isLoggedIn = req.session.isLoggedIn;
   res.locals.user = req.session.user;
   res.locals.path = req.path;
   next();
});


app.use(authRoutes);
app.use(treatmentsRoutes);
app.use(pricesRoutes);
app.use(carsRoutes);
app.use(adminRoutes);


app.listen(3000);



