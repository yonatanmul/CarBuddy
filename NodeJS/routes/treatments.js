const express = require('express');
const router = express.Router();


const treatmentsController = require('../controllers/treatments');
const isAuth = require('../util/is_auth');


router.get('/maintenance', isAuth, treatmentsController.getTreatments);
router.post('/maintenance-filter', isAuth, treatmentsController.filterTreatments);
router.post('/save-treatment', isAuth, treatmentsController.saveTreatment);


module.exports = router;
