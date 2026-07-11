const express = require('express');
const router = express.Router();
const carsController = require('../controllers/cars');
const isAuth = require('../util/is_auth');
router.get('/find-car', isAuth, carsController.getCars);
router.post('/save-car', isAuth, carsController.saveCar);
router.get('/car-details/:id', isAuth, carsController.getCarById);
router.post('/recommend', isAuth, carsController.recommend);
module.exports = router;