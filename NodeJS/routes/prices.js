const express = require('express');
const router = express.Router();


const pricesController = require('../controllers/prices');
const isAuth = require('../util/is_auth');


router.get('/pricing', isAuth, pricesController.getPrices);
router.post('/pricing-filter', isAuth, pricesController.filterPrices);
router.post('/save-price', isAuth, pricesController.savePrice);
router.get('/pricing/:cat', isAuth, pricesController.getPricesByCat);

module.exports = router;
