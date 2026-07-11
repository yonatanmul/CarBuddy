const Car = require('../models/car');


exports.saveCar = (req, res, next) => {
   const car = new Car(
       req.body.cname,
       req.body.cmaker,
       req.body.cyear,
       req.body.cseats,
       req.body.cbody,
       req.body.cfuel,
       req.body.cprice,
       req.body.cdesc
   );
   car.save()
       .then(() => {
           req.session.saved = true;
           res.redirect('/find-car');
       })
       .catch(err => { res.render('error', { error: err }); });
};


exports.getCars = (req, res, next) => {
   const saved = req.session.saved;
   req.session.saved = false;
   Car.getAll()
       .then(rows => { res.render('recommendation', { cars: rows[0], searched: false, saved: saved }); })
       .catch(err => { res.render('error', { error: err }); });
};


exports.recommend = (req, res, next) => {
   const maxPrice = req.body.maxprice;
   const fuel = req.body.fuel;
   const minSeats = req.body.seats;
   if (fuel === 'all') {
       Car.searchNoFuel(maxPrice, minSeats)
           .then(rows => { res.render('recommendation', { cars: rows[0], searched: true, saved: false }); })
           .catch(err => { res.render('error', { error: err }); });
   } else {
       Car.search(maxPrice, fuel, minSeats)
           .then(rows => { res.render('recommendation', { cars: rows[0], searched: true, saved: false }); })
           .catch(err => { res.render('error', { error: err }); });
   }
};


exports.getCarById = (req, res, next) => {
   const id = req.params.id;
   Car.getById(id)
       .then(prod => { res.render('recommendation_details', { car: prod[0][0] }); })
       .catch(err => { res.render('error', { error: err }); });
};


