const Price = require('../models/price');


exports.savePrice = (req, res, next) => {
   const price = new Price(
       req.body.item,
       req.body.maker,
       req.body.category,
       req.body.model,
       req.body.supplier,
       req.body.warranty,
       req.body.price
   );
   price.save()
       .then(() => {
           req.session.saved = true;
           res.redirect('/pricing');
       })
       .catch(err => { res.render('error', { error: err }); });
};


exports.getPrices = (req, res, next) => {
   const saved = req.session.saved;
   req.session.saved = false;
   Price.getAll()
       .then(rows => { res.render('pricing', { prices: rows[0], selected: 'all', saved: saved }); })
       .catch(err => { res.render('error', { error: err }); });
};

exports.getPricesByCat = (req, res, next) => {
    let category = 'טיפולים במוסך';
    if (req.params.cat === 'parts') {
        category = 'חלפים וצמיגים';
    }
    Price.getByCategory(category)
        .then(rows => { res.render('pricing', { prices: rows[0], selected: category, saved: false }); })
        .catch(err => { res.render('error', { error: err }); });
};


exports.filterPrices = (req, res, next) => {
   const category = req.body.category;
   if (category === 'all') {
       Price.getAll()
           .then(rows => { res.render('pricing', { prices: rows[0], selected: 'all', saved: false }); })
           .catch(err => { res.render('error', { error: err }); });
   } else {
       Price.getByCategory(category)
           .then(rows => { res.render('pricing', { prices: rows[0], selected: category, saved: false }); })
           .catch(err => { res.render('error', { error: err }); });
   }
};


