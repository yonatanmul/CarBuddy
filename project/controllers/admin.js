const path = require('path');

exports.getHome = (req, res, next) => {
    res.render('index', { user: req.session.user });
};
exports.getFuel = (req, res, next) => {
   res.redirect('http://orelbe2.mtacloud.co.il/Includes/fuel_log.html');
};
exports.getNotFound = (req, res, next) => {
    res.render('404');
};