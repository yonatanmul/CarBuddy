const Treatment = require('../models/treatment');


exports.saveTreatment = (req, res, next) => {
   const treatment = new Treatment(
       req.body.treat_date,
       req.body.treat_type,
       req.body.km,
       req.body.garage,
       req.body.cost,
       req.body.notes
   );
   treatment.save()
       .then(() => {
           req.session.saved = true;
           res.redirect('/maintenance');
       })
       .catch(err => { res.render('error', { error: err }); });
};


exports.getTreatments = (req, res, next) => {
   const saved = req.session.saved;
   req.session.saved = false;
   Treatment.getAll()
       .then(rows => { res.render('maintenance', { treatments: rows[0], selected: 'all', saved: saved }); })
       .catch(err => { res.render('error', { error: err }); });
};


exports.filterTreatments = (req, res, next) => {
   const treatType = req.body.treat_type;
   if (treatType === 'all') {
       Treatment.getAll()
           .then(rows => { res.render('maintenance', { treatments: rows[0], selected: 'all', saved: false }); })
           .catch(err => { res.render('error', { error: err }); });
   } else {
       Treatment.getByType(treatType)
           .then(rows => { res.render('maintenance', { treatments: rows[0], selected: treatType, saved: false }); })
           .catch(err => { res.render('error', { error: err }); });
   }
};


