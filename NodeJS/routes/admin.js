const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../util/is_auth');
router.get('/', adminController.getHome);
router.get('/fuel', isAuth, adminController.getFuel);
router.use(adminController.getNotFound);
module.exports = router;