const db = require('../util/database');


module.exports = class Treatment {
    constructor(treat_date, treat_type, km, garage, cost, notes) {
        this.treat_date = treat_date;
        this.treat_type = treat_type;
        this.km = km;
        this.garage = garage;
        this.cost = cost;
        this.notes = notes;
    }


    save() {
        return db.execute(
            'INSERT INTO treatments (`treat_date`,`treat_type`,`km`,`garage`,`cost`,`notes`) VALUES (?,?,?,?,?,?)',
            [this.treat_date, this.treat_type, this.km, this.garage, this.cost, this.notes]
        );
    }


    static getAll() {
        return db.execute('SELECT * FROM treatments');
    }


    static getByType(treatType) {
        return db.execute('SELECT * FROM treatments WHERE treat_type = ?', [treatType]);
    }
};


