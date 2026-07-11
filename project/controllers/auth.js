const bcrypt = require('bcryptjs');
const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    let success = null;
    if (req.session.justRegistered){
        success = "הרשמה מוצלחת!"
        req.session.justRegistered = false;
    }
    res.render('login', { error: null, success: success });
};
exports.getRegister = (req, res, next) => {
    res.render('register', { error: null});
};
exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getByName(username)
        .then(resUser => {
            if (!resUser[0][0]) {
                return res.render('login', { error: 'שם המשתמש לא נמצא', success:null });
            }
            return bcrypt.compare(password, resUser[0][0].password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = username;
                        res.redirect('/');
                    } else {
                        res.render('login', { error: 'הסיסמה שגויה', success:null });
                    }
                });
        })
        .catch(err => { res.render('error', { error: err }); });
};
exports.postRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getByName(username)
        .then(resUser => {
            if (resUser[0][0]) {
                return res.render('register', { error: 'שם המשתמש כבר קיים! בחרו שם אחר' });
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User(
                        username,
                        hashedPassword,
                        req.body.fname,
                        req.body.lname,
                        req.body.email,
                        req.body.phone,
                        req.body.idnum,
                        req.body.birth,
                        req.body.city,
                        req.body.license,
                        req.body.plate
                    );
                    return user.save();
                })
                .then(() => { 
                    req.session.justRegistered = true;
                    res.redirect('/login'); });
        })
        .catch(err => { res.render('error', { error: err }); });
};
exports.getProfile = (req, res, next) => {
    User.getByName(req.session.user)
        .then(resUser => { res.render('profile', { user: resUser[0][0] }); })
        .catch(err => { res.render('error', { error: err }); });
};
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) { console.log(err); }
        res.redirect('/');
    });
};