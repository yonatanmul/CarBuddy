const db = require('../util/database');
module.exports = class Car {
    constructor(cname, cmaker, cyear, cseats, cbody, cfuel, cprice, cdesc) {
        this.cname = cname;
        this.cmaker = cmaker;
        this.cyear = cyear;
        this.cseats = cseats;
        this.cbody = cbody;
        this.cfuel = cfuel;
        this.cprice = cprice;
        this.cdesc = cdesc;
    }
    save() {
        return db.execute(
            'INSERT INTO cars (`cname`,`cmaker`,`cyear`,`cseats`,`cbody`,`cfuel`,`cprice`,`cdesc`) VALUES (?,?,?,?,?,?,?,?)',
            [this.cname, this.cmaker, this.cyear, this.cseats, this.cbody, this.cfuel, this.cprice, 
this.cdesc]
        );
    }
    static getAll() {
        return db.execute('SELECT * FROM cars');
    }
    static getById(id) {
        return db.execute('SELECT * FROM cars WHERE id=?', [id]);
    }
    static search(maxPrice, fuel, minSeats) {
        return db.execute(
            'SELECT * FROM cars WHERE cprice <= ? AND cfuel = ? AND cseats >= ?',
            [maxPrice, fuel, minSeats]
        );
    }
    static searchNoFuel(maxPrice, minSeats) {
        return db.execute(
            'SELECT * FROM cars WHERE cprice <= ? AND cseats >= ?',
            [maxPrice, minSeats]
        );
    }
};